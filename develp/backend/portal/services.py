from .models import Buyer, Supplier, Contract
import requests

# Para sacar info de contratos

def obtener_ocids_contratos_c(buyerID, contractsPage, contractsPaginateBy, contractDateSigned):
    # Construir la URL con los parámetros proporcionados
    url = f"https://contratacionesabiertas.osce.gob.pe/api/v1/buyerContracts?buyerID={buyerID}&contractsPage={contractsPage}&contractsPaginateBy={contractsPaginateBy}&processesPage=1&processesPaginateBy=5&processes_description=-&typeContractDateSigned=%3E&contractDateSigned={contractDateSigned}&format=json"
    
    # Hacer la solicitud a la API
    response = requests.get(url)
    
    # Lista para almacenar los ocids de los contratos, eliminando duplicados
    ocids = set()

    if response.status_code == 200:
        data = response.json()

        # Iterar sobre los resultados y obtener los ocid de los contratos
        for contract in data.get('results', []):
            ocid = contract.get('ocid')
            if ocid:
                ocids.add(ocid)  # Usamos set para evitar duplicados

    # Convertir el set a lista antes de devolverlo
    return list(ocids)

def obtener_ocids_contratos(supplierID, contractsPage, contractsPaginateBy, contractDateSigned):
    url = f"https://contratacionesabiertas.osce.gob.pe/api/v1/supplierContracts?supplierID={supplierID}&contractsPage={contractsPage}&contractsPaginateBy={contractsPaginateBy}&processesPage=1&processesPaginateBy=5&processesTendererPage=1&processesTendererPaginateBy=5&processes_tenderer_description=-&processes_description=-&typeContractDateSigned=%3E&contractDateSigned={contractDateSigned}&format=json"
    
    response = requests.get(url)
    
    ocids = set()

    if response.status_code == 200:
        data = response.json()

        for contract in data.get('results', []):
            ocid = contract.get('ocid')
            if ocid:
                ocids.add(ocid)

    return list(ocids)

def obtener_buyer_supplier(ocid):
    url = f"https://contratacionesabiertas.osce.gob.pe/api/v1/record/{ocid}?format=json"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Asegura que se maneje el error si la solicitud falla
    except requests.RequestException as e:
        print(f"Error al obtener datos de la API para el OCID {ocid}: {e}")
        return None  # Devuelve None en caso de error de solicitud
    
    buyer_name = None
    supplier_name = None
    contract_id = ocid  # Usamos el ocid como identificador del contrato

    data = response.json()
    for result in data.get('records', []):
        compiledRelease = result.get('compiledRelease', {})
        buyer_name = compiledRelease.get('buyer', {}).get('name')
        buyer_id = compiledRelease.get('buyer', {}).get('id')
        if 'awards' in compiledRelease:
            supplier_name = compiledRelease['awards'][0]['suppliers'][0]['name'] if compiledRelease['awards'][0].get('suppliers') else None
            supplier_id = compiledRelease['awards'][0]['suppliers'][0]['id'] if compiledRelease['awards'][0].get('suppliers') else None

    # Crear nodos y relaciones en la base de datos
    if buyer_name and supplier_name:
        buyer = obtener_o_crear_buyer(buyer_name)
        supplier = obtener_o_crear_supplier(supplier_name)
        crear_contrato(buyer, supplier, contract_id)

    return {
        'contract_id': contract_id,
        'buyer_name': buyer_name,
        'supplier_name': supplier_name,
        'buyer_id': buyer_id,
        'supplier_id': supplier_id
    }

# Para sacar info de las entidades en el apartado entidades

def obtener_buyers(buyer_name, page, paginate_by):
    url = f"https://contratacionesabiertas.osce.gob.pe/api/v1/buyers?page={page}&paginateBy={paginate_by}0&order_last_process=desc&buyer={buyer_name}&format=json"
    
    response = requests.get(url)

    buyers = []

    if response.status_code == 200:
        data = response.json()

        # Obtener los nombres y los IDs de los compradores
        buyers = [
            {
                'name': result['buyer']['name'],
                'id': result['buyer']['id']
            }
            for result in data.get('results', [])
            if 'buyer' in result
        ]

    return buyers

# Para sacar info de los proveedores en el apartado proveedores

def obtener_suppliers(supplier_name, page, paginate_by):
    url = f"https://contratacionesabiertas.osce.gob.pe/api/v1/suppliers?page={page}&paginateBy={paginate_by}&supplier={supplier_name}&format=json"
    
    response = requests.get(url)
    
    suppliers = []

    if response.status_code == 200:
        data = response.json()

        # Obtener los nombres y los IDs de los proveedores
        suppliers = [
            {
                'name': result['supplier']['name'],
                'id': result['supplier']['id']
            }
            for result in data.get('results', [])
            if 'supplier' in result
        ]

    return suppliers

# Para el modelooo, models.py

def obtener_o_crear_buyer(buyer_name):
    try:
        return Buyer.nodes.get(name=buyer_name)
    except Buyer.DoesNotExist:
        return Buyer(name=buyer_name).save()

def obtener_o_crear_supplier(supplier_name):
    try:
        return Supplier.nodes.get(name=supplier_name)
    except Supplier.DoesNotExist:
        return Supplier(name=supplier_name).save()

def crear_contrato(buyer, supplier, contract_name):
    # Verificar si el contrato ya existe en la base de datos
    contratos_existentes = Contract.nodes.filter(name=contract_name).all()
    
    if contratos_existentes:
        # Si el contrato ya existe, no creamos uno nuevo ni repetimos las relaciones
        print(f"El contrato con OCID '{contract_name}' ya existe.")
        return contratos_existentes[0]  # Devuelve el primer contrato encontrado
    else:
        # Crear el nuevo contrato y establecer relaciones
        contrato = Contract(name=contract_name).save()
        
        # Conectar el contrato con el comprador y el proveedor
        buyer.contracts.connect(contrato)
        contrato.supplier.connect(supplier)
        
        # Gestionar el peso de la relación
        relacion = buyer.suppliers.relationship(supplier)
        if relacion:
            # Incrementar el peso si la relación ya existe
            relacion.weight += 1
            relacion.save()
        else:
            # Crear una nueva relación con peso inicial de 1
            buyer.suppliers.connect(supplier, {'weight': 1})

        return contrato