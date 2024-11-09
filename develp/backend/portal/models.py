from neomodel import StructuredRel, IntegerProperty, StructuredNode, StringProperty, RelationshipTo, RelationshipFrom, Relationship

class RelacionConPeso(StructuredRel):
    weight = IntegerProperty(default=1)

class Buyer(StructuredNode):
    id_buyer = StringProperty(required=True)
    name = StringProperty(required=True)
    contracts = RelationshipTo('Contract', 'HAS_CONTRACT')
    suppliers = RelationshipTo('Supplier', 'HAS_RELATIONSHIP', model=RelacionConPeso)

class Supplier(StructuredNode):
    id_sup = StringProperty(required=True)
    name = StringProperty(required=True)
    buyers = RelationshipFrom('Buyer', 'HAS_RELATIONSHIP', model=RelacionConPeso)  # Relación con Buyer


class Contract(StructuredNode):
    name = StringProperty(required=True)
    buyer = RelationshipFrom('Buyer', 'HAS_CONTRACT')
    supplier = RelationshipTo('Supplier', 'WITH_SUPPLIER')

class RelacionConPeso(StructuredRel):
    weight = IntegerProperty(default=1)