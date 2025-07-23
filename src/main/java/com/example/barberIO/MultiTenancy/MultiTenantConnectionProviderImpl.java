//package com.example.barberIO.MultiTenancy;
//
//import org.hibernate.engine.jdbc.connections.spi.MultiTenantConnectionProvider;
//import org.springframework.stereotype.Component;
//
//import javax.sql.DataSource;
//import java.sql.Connection;
//import java.sql.SQLException;
//import java.util.Map;
//
//@Component
//public class MultiTenantConnectionProviderImpl implements MultiTenantConnectionProvider {
//
//    private final Map<String, DataSource> dataSources;
//
//    public MultiTenantConnectionProviderImpl(Map<String, DataSource> dataSources) {
//        this.dataSources = dataSources;
//    }
//
//    @Override
//    public Connection getConnection(String tenantIdentifier) throws SQLException {
//        DataSource dataSource = dataSources.get(tenantIdentifier);
//        if (dataSource == null) {
//            throw new SQLException("No datasource found for tenant: " + tenantIdentifier);
//        }
//        return dataSource.getConnection();
//    }
//
//    @Override
//    public Connection getAnyConnection() throws SQLException {
//        return dataSources.values().iterator().next().getConnection();
//    }
//
//    @Override
//    public void releaseConnection(Connection connection) throws SQLException {
//        connection.close();
//    }
//
//    @Override
//    public void releaseAnyConnection(Connection connection) throws SQLException {
//        connection.close();
//    }
//
//    @Override
//    public boolean supportsAggressiveRelease() {
//        return false;
//    }
//
//    @Override
//    public boolean isUnwrappableAs(Class<?> unwrapType) {
//        return false;
//    }
//
//    @Override
//    public <T> T unwrap(Class<T> unwrapType) {
//        return null;
//    }
//}
