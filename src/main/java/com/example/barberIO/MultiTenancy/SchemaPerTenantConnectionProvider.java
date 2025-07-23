package com.example.barberIO.MultiTenancy;

import org.hibernate.engine.jdbc.connections.spi.MultiTenantConnectionProvider;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@Component
public class SchemaPerTenantConnectionProvider implements MultiTenantConnectionProvider<Object> { // Opcional, mas boa prática

    private final transient DataSource dataSource;

    public SchemaPerTenantConnectionProvider(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public Connection getAnyConnection() throws SQLException {
        return dataSource.getConnection();
    }

    @Override
    public void releaseAnyConnection(Connection connection) throws SQLException {
        connection.close();
    }

    // A MUDANÇA PRINCIPAL ESTÁ AQUI
    @Override
    public Connection getConnection(Object tenantIdentifierObj) throws SQLException {
        final Connection connection = getAnyConnection();
        try {
            // Convertemos o Object para String para usar no comando SQL
            String tenantIdentifier = tenantIdentifierObj.toString();
            connection.createStatement().execute(String.format("SET search_path TO %s;", tenantIdentifier));
        } catch (SQLException e) {
            throw new SQLException("Não foi possível alterar para o schema do tenant [" + tenantIdentifierObj + "]", e);
        }
        return connection;
    }

    // E AQUI TAMBÉM
    @Override
    public void releaseConnection(Object tenantIdentifierObj, Connection connection) throws SQLException {
        try {
            // Reseta o search_path para o schema padrão (public)
            connection.createStatement().execute("SET search_path TO public;");
        } catch (SQLException e) {
            System.err.println("Não foi possível resetar o schema para o tenant [" + tenantIdentifierObj + "]. " + e.getMessage());
        } finally {
            connection.close();
        }
    }

    @Override
    public boolean supportsAggressiveRelease() {
        return false;
    }

    @Override
    public boolean isUnwrappableAs(Class<?> unwrapType) {
        return false;
    }

    @Override
    public <T> T unwrap(Class<T> unwrapType) {
        return null;
    }
}