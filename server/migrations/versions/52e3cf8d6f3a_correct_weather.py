"""correct weather

Revision ID: 52e3cf8d6f3a
Revises: 1417a5149c7b
Create Date: 2024-04-25 15:04:32.523647

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '52e3cf8d6f3a'
down_revision = '1417a5149c7b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('locations')
    op.drop_table('weathers')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('weathers',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('state', sa.VARCHAR(), nullable=True),
    sa.Column('date_created', sa.DATETIME(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    sa.Column('date_updated', sa.DATETIME(), nullable=False),
    sa.Column('location_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['location_id'], ['locations.id'], name='fk_weathers_location_id_locations'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('locations',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(), nullable=False),
    sa.Column('activity', sa.VARCHAR(), nullable=True),
    sa.Column('date_created', sa.DATETIME(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False),
    sa.Column('date_updated', sa.DATETIME(), nullable=False),
    sa.Column('weather_id', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['weather_id'], ['weathers.id'], name='fk_locations_weather_id_weathers'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
