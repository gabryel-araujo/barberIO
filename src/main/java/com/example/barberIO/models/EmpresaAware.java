package com.example.barberIO.models;

public interface EmpresaAware extends BaseEntity {
    EmpresaModel getEmpresa();
    void setEmpresa(EmpresaModel empresa);
}
