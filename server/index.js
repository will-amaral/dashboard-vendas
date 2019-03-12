const cors = require('cors');
const app = require('express')();
const MongoClient = require('mongodb').MongoClient;
const csv = require('csvtojson');
const _ = require('lodash');

const uri = 'mongodb+srv://admin:291092@cluster0-qdv0c.mongodb.net';
var db;
var dado = {
	data: []
};

MongoClient.connect(uri, 
	{
		useNewUrlParser : true,
		poolSize: 20,
		socketTimeoutMS: 480000,
		keepAlive: 300000,
		ssl: true,
		sslValidate: false
	}, (err, client) => {
		if (err) throw err;
		db = client.db('cloudssistemas');

		app.listen(3001, () => {
			console.log('Server running at port 3001')
		});
})

csv({
	checkType: true
})
.fromFile(__dirname + '/dados_teste.csv')
.then((jsonObj) => {
	dado.data = jsonObj;
});

const setDados = (res) => {
	db.collection('dados').insertMany(dado.data, (err, result) => {
		if (err) {
			console.log(err);
			res.send(err);
		} else {
			console.log(result.ops);
			res.send(result.ops.length + ' documentos inseridos');
		}
	});
};

const deleteDados = (res) => {
	db.collection('dados').deleteMany({}, (err, result) => {
		if (err) {
			console.log(err);
			res.send(err);
		} else {
			console.log(result);
			res.send(result.result.n + ' documentos deletados');
		}
	});
}

const getDados = (res) => {
	db.collection('dados').find({}).toArray((err, docs) => {
		if (err) {
			console.log(err);
			res.send(err);
		} else {
			console.log('Requisição GET realizada com sucesso');
			let value1 = _(docs)
				.groupBy("CODIGO")
				.mapValues((objs) => ({
					"DESCRICAO": objs[0].DESCRICAO,
					"QUANTIDADE": _.sumBy(objs, "QUANTIDADE")
				}))
				.value();
			let value2 = _(docs)
			.groupBy("CODIGO")
			.mapValues((objs) => ({
				"DESCRICAO": objs[0].DESCRICAO,
				"TOTAL": _.sumBy(objs, "TOTAL")
			}))
			.value();

			let value = {
				quantidade: value1,
				valor: value2
			};
			
			res.send(value);
		}
	})
}


app.use(cors());


app.post('/api/dados', (req, res) => {
	setDados(res);
});

app.delete('/api/dados', (req, res) => {
	deleteDados(res);
});

app.get('/api/dados', (req, res) => {
	getDados(res);
});