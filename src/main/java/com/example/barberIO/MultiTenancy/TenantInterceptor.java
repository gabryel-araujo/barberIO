package com.example.barberIO.MultiTenancy;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

@Component
public class TenantInterceptor implements HandlerInterceptor {

    private static final String TENANT_HEADER = "X-Tenant-ID";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String tenantId = request.getHeader(TENANT_HEADER);
        
        if (tenantId != null && !tenantId.isEmpty()) {
            TenantContext.setCurrentTenant(tenantId);
        } else {
            // Opcional: Lançar exceção se o tenant não for fornecido
            // response.sendError(HttpServletResponse.SC_BAD_REQUEST, "X-Tenant-ID header não encontrado na requisição");
            // return false;

            // Ou definir um tenant padrão, se aplicável
             TenantContext.setCurrentTenant("public"); // Schema público como padrão
        }
        
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        // Limpa o TenantContext para evitar memory leaks e problemas entre requisições
        TenantContext.clear();
    }
}