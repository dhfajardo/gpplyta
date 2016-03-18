var loopback = require('loopback');

module.exports = function(Empleado) 
{
Empleado.on('dataSourceAttached', function(obj)
	{
		/*var upsert = Empleado.upsert;
		Empleado.upsert = function(dt,cb)
		{
			console.log("es un upsert");
			return upsert.apply(this,arguments);
		};*/
		
		var create = Empleado.create;
		Empleado.create = function(model,cb)
		{
			model.csfechac = new Date().toLocaleString();
			model.csfecham = new Date().toLocaleString();
			model.csestado = 1;
			var context = loopback.getCurrentContext();
			var accessToken = context.get('accessToken');
			model.csusuario = accessToken.userId;
			return create.apply(this,arguments);
		};
	});
};
