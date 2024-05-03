"""update all

Revision ID: 1f9ea58a113f
Revises: 6da63cd2880a
Create Date: 2024-04-25 18:44:37.018004

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1f9ea58a113f'
down_revision = '6da63cd2880a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('locations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('activity', sa.String(), nullable=True),
    sa.Column('date_created', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('date_updated', sa.DateTime(), nullable=True),
    sa.Column('weather_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['weather_id'], ['weathers.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('weathers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('state', sa.String(), nullable=True),
    sa.Column('temperature', sa.Float(), nullable=True),
    sa.Column('humidity', sa.Float(), nullable=True),
    sa.Column('windspeed', sa.Float(), nullable=True),
    sa.Column('rain_level', sa.Float(), nullable=True),
    sa.Column('activity', sa.String(), nullable=True),
    sa.Column('date_created', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('date_updated', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('location_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['location_id'], ['locations.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('weathers')
    op.drop_table('locations')
    # ### end Alembic commands ###
