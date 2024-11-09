from django.urls import path
from . import views

urlpatterns = [
    # Endpoints de API
    path('api/buyers/', views.api_listar_buyers, name='api_listar_buyers'),
    path('api/suppliers/', views.api_listar_suppliers, name='api_listar_suppliers'),
    path('api/buyers/<str:buyer_id>/contracts/', views.api_listar_contratos_por_buyer, name='api_listar_contratos_por_buyer'),
    path('api/suppliers/<str:supplier_id>/contracts/', views.api_listar_contratos_por_supplier, name='api_listar_contratos_por_supplier'),
    path('api/node/<str:node_id>/', views.obtener_datos_relacionados, name='obtener_datos_relacionados'),
    
    # Endpoints existentes para páginas HTML, por las dudas xd
    path('suppliers/', views.listar_suppliers, name='listar_suppliers'),
    path('buyers/', views.listar_buyers, name='listar_buyers'),
    path('suppliers/<str:supplier_id>/contracts/', views.listar_contratos_con_detalles, name='listar_ocids_contratos'),
    path('buyers/<str:buyer_id>/contracts/', views.listar_contratos_con_detalles_c, name='listar_ocids_contratos_c'),
]