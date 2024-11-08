from neomodel import StructuredRel, IntegerProperty, StructuredNode, StringProperty, RelationshipTo, RelationshipFrom, Relationship

class RelacionConPeso(StructuredRel):
    weight = IntegerProperty(default=1)

class Buyer(StructuredNode):
    name = StringProperty(required=True)
    contracts = RelationshipTo('Contract', 'HAS_CONTRACT')
    suppliers = Relationship('Supplier', 'HAS_RELATIONSHIP', model=RelacionConPeso)

class Supplier(StructuredNode):
    name = StringProperty(required=True)

class Contract(StructuredNode):
    name = StringProperty(required=True)
    buyer = RelationshipFrom('Buyer', 'HAS_CONTRACT')
    supplier = RelationshipTo('Supplier', 'WITH_SUPPLIER')

class RelacionConPeso(StructuredRel):
    weight = IntegerProperty(default=1)