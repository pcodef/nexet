from django.http import JsonResponse
from django.shortcuts import render

from .models import Buyer,Supplier
from .services import obtener_buyer_supplier, obtener_ocids_contratos_c, obtener_suppliers, obtener_ocids_contratos, obtener_buyers

#######END

# Endpoint para obtener la lista de compradores

def obtener_datos_relacionados(request, node_id):
    try:
        # Intentar obtener el Buyer por el ID
        try:
            buyer = Buyer.nodes.get(id_buyer=node_id)
            
            # Si el nodo es un Buyer, obtener los suppliers relacionados y sus pesos
            suppliers_data = []
            for supplier in buyer.suppliers.all():  # Obtiene todos los suppliers conectados al buyer
                # Usa all_relationships() para obtener la relación con sus atributos
                relationship = buyer.suppliers.all_relationships(supplier)[0]
                suppliers_data.append({
                    'id_sup': supplier.id_sup,
                    'name': supplier.name,
                    'weight': relationship.weight  # Peso de la relación
                })
            
            data = {
                'buyer_id': buyer.id_buyer,
                'name': buyer.name,
                'suppliers': suppliers_data
            }
            return JsonResponse(data)

        except Buyer.DoesNotExist:
            pass  # Si no es un Buyer, continúa para intentar como Supplier

        # Intentar obtener el Supplier por el ID
        try:
            supplier = Supplier.nodes.get(id_sup=node_id)
            
            # Si el nodo es un Supplier, obtener los buyers relacionados y sus pesos
            buyers_data = []
            for buyer in supplier.buyers.all():  # Obtiene todos los buyers conectados al supplier
                # Usa all_relationships() para obtener la relación con sus atributos
                relationship = supplier.buyers.all_relationships(buyer)[0]
                buyers_data.append({
                    'id_buyer': buyer.id_buyer,
                    'name': buyer.name,
                    'weight': relationship.weight  # Peso de la relación
                })
            
            data = {
                'supplier_id': supplier.id_sup,
                'name': supplier.name,
                'buyers': buyers_data
            }
            return JsonResponse(data)

        except Supplier.DoesNotExist:
            pass

        # Si no se encuentra ni como Buyer ni como Supplier
        return JsonResponse({'error': 'Node not found'}, status=404)

    except Exception as e:
        # Manejamos cualquier error inesperado
        print("Error:", e)  # Imprimir el error en la consola para depuración
        return JsonResponse({'error': str(e)}, status=500)

def api_listar_buyers(request):
    buyer_name = request.GET.get('buyer_name', '')
    page = int(request.GET.get('page', 1))
    paginate_by = int(request.GET.get('paginate_by', 10))
    buyers = obtener_buyers(buyer_name=buyer_name, page=page, paginate_by=paginate_by)
    return JsonResponse({'buyers': buyers})

# Endpoint para obtener la lista de proveedores/suppliers
def api_listar_suppliers(request):
    supplier_name = request.GET.get('supplier_name', '')
    page = int(request.GET.get('page', 1))
    paginate_by = int(request.GET.get('paginate_by', 10))
    suppliers = obtener_suppliers(supplier_name=supplier_name, page=page, paginate_by=paginate_by)
    return JsonResponse({'suppliers': suppliers})

# Endpoint para obtener contratos por comprador con detalles
def api_listar_contratos_por_buyer(request, buyer_id):
    contracts_page = int(request.GET.get('contracts_page', 1))
    contracts_paginate_by = int(request.GET.get('contracts_paginate_by', 10))
    contract_date_signed = request.GET.get('contract_date_signed', '2024-01-01')

    ocids = obtener_ocids_contratos_c(buyerID=buyer_id, contractsPage=contracts_page, contractsPaginateBy=contracts_paginate_by, contractDateSigned=contract_date_signed)
    contratos_detalles = [obtener_buyer_supplier(ocid) for ocid in ocids]
    
    return JsonResponse({'contratos_detalles': contratos_detalles})

# Endpoint para obtener contratos por proveedor con detalles
def api_listar_contratos_por_supplier(request, supplier_id):
    contracts_page = int(request.GET.get('contracts_page', 1))
    contracts_paginate_by = int(request.GET.get('contracts_paginate_by', 10))
    contract_date_signed = request.GET.get('contract_date_signed', '2024-01-01')

    ocids = obtener_ocids_contratos(supplierID=supplier_id, contractsPage=contracts_page, contractsPaginateBy=contracts_paginate_by, contractDateSigned=contract_date_signed)
    contratos_detalles = [obtener_buyer_supplier(ocid) for ocid in ocids]
    
    return JsonResponse({'contratos_detalles': contratos_detalles})

#######END

# Buyers

def listar_buyers(request):
    buyer_name = request.GET.get('buyer_name', '')
    page = int(request.GET.get('page', 1))
    paginate_by = int(request.GET.get('paginate_by', 10))

    buyers = []
    if buyer_name:
        buyers = obtener_buyers(buyer_name=buyer_name, page=page, paginate_by=paginate_by)

    return render(request, 'portal/buyer_list.html', {
        'buyers': buyers,
        'buyer_name': buyer_name,
        'page': page,
        'paginate_by': paginate_by,
    })

# Proveedores

def listar_suppliers(request):
    supplier_name = request.GET.get('supplier_name', '')
    page = int(request.GET.get('page', 1))
    paginate_by = int(request.GET.get('paginate_by', 10))

    suppliers = []
    if supplier_name:
        suppliers = obtener_suppliers(supplier_name=supplier_name, page=page, paginate_by=paginate_by)

    return render(request, 'portal/supplier_list.html', {
        'suppliers': suppliers,
        'supplier_name': supplier_name,
        'page': page,
        'paginate_by': paginate_by,
    })

# Contratos

def listar_contratos_con_detalles_c(request, buyer_id):
    contracts_page = int(request.GET.get('contracts_page', 1))
    contracts_paginate_by = int(request.GET.get('contracts_paginate_by', 10))
    contract_date_signed = request.GET.get('contract_date_signed', '2024-01-01')

    # Obtener OCIDs usando obtener_ocids_contratos
    ocids = obtener_ocids_contratos_c(
        buyerID=buyer_id,
        contractsPage=contracts_page,
        contractsPaginateBy=contracts_paginate_by,
        contractDateSigned=contract_date_signed
    )
    
    # Obtener detalles de cada contrato
    contratos_detalles = []
    for ocid in ocids:
        detalles = obtener_buyer_supplier(ocid)
        contratos_detalles.append(detalles)

    return render(request, 'portal/contract_details_list.html', {
        'contratos_detalles': contratos_detalles,
        'buyer_id': buyer_id,
        'contract_date_signed': contract_date_signed,
        'user_type': 'buyer',
    })

def listar_contratos_con_detalles(request, supplier_id):
    contracts_page = int(request.GET.get('contracts_page', 1))
    contracts_paginate_by = int(request.GET.get('contracts_paginate_by', 10))
    contract_date_signed = request.GET.get('contract_date_signed', '2024-01-01')

    ocids = obtener_ocids_contratos(
        supplierID=supplier_id,
        contractsPage=contracts_page,
        contractsPaginateBy=contracts_paginate_by,
        contractDateSigned=contract_date_signed
    )
    
    contratos_detalles = []
    for ocid in ocids:
        detalles = obtener_buyer_supplier(ocid)
        if detalles:  # Solo agregar si los detalles no son None
            contratos_detalles.append(detalles)

    return render(request, 'portal/contract_details_list.html', {
        'contratos_detalles': contratos_detalles,
        'supplier_id': supplier_id,
        'contract_date_signed': contract_date_signed,
        'user_type': 'supplier',
    })