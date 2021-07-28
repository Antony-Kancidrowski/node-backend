/**
 * Copyright (c) 2021 Antony Kancidrowski
 */

exports.address = {
	addressPrefix: `mongodb://localhost:27017/`,
	test:'cake_test',
	production:'cake',
};

// MongoDB collections
exports.collections = [
	{
		name:"cake",
		options:{
			validator:{
				$jsonSchema: {
					bsonType: "object",
					required:["cakeID", "name", "comment", "imageUrl", "yumFactor"],
					properties:{
						cakeID:{
							bsonType: "string",
						},
            name:{
							bsonType: "string",
						},
            comment:{
							bsonType: "string",
						},
            imageUrl:{
							bsonType: "string",
						},
            yumFactor:{
							bsonType: "int",
						},
					},
				},
			},
		},
		index:{
			"cakeID" : 1,
		}
	}
];