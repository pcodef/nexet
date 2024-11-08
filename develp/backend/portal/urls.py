from django.urls import path
from . import views

urlpatterns = [
    path('suppliers/', views.listar_suppliers, name='listar_suppliers'),
    path('buyers/', views.listar_buyers, name='listar_buyers'),
    path('suppliers/<str:supplier_id>/contracts/', views.listar_contratos_con_detalles, name='listar_ocids_contratos'),
    path('buyers/<str:buyer_id>/contracts/', views.listar_contratos_con_detalles_c, name='listar_ocids_contratos_c'),
]