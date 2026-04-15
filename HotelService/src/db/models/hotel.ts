import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "./sequelize";

class Hotel extends Model<InferAttributes<Hotel>, InferCreationAttributes<Hotel>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare address: String;
    declare location: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare rating: number;
    declare ratingCount: number;


}

Hotel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: null
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: null
    },
    rating: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true
    },
    ratingCount: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: "hotels",
    underscored: true,
    sequelize: sequelize
});

export default Hotel;