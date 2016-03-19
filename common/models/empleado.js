var loopback = require('loopback');
module.exports = function(Empleado) 
{
	/*
	Empleado.on('dataSourceAttached', function(obj)
	{
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
	*/
	Empleado.observe('before save', function attibutesUpCrt(ctx, next)
		{
			if(ctx.instance)
			{
				var _date = new Date();
				ctx.instance.csfecham = _date;
				ctx.instance.csfechac = _date;
				ctx.csestado = 1;
				var context = loopback.getCurrentContext();
				var accessToken = context.get('accessToken');
				ctx.instance.csusuario = accessToken.userId;
				//console.log('Creacion de un nuevo Empleado');
			}
			else
			{
				ctx.data.csfecham = new Date();
				var context = loopback.getCurrentContext();
				var accessToken = context.get('accessToken');
				ctx.data.csusuario = accessToken.userId;
				//console.log('Actualizacion de un Empleado existente');
			}
			next();
		});
	/*var upempl = Empleado.upsert;
	Empleado.upsert = function(data,cb)
	{
		data.csfecham = new Date().toLocaleString();
		console.log('Actualizando Empleado');
		return upempl.apply(this,arguments);
	};*/
	/*Empleado.on('dataSourceAttached', function(obj)
	{
		var upempl = Empleado.upsert;
		Empleado.upsert = function(data,cb)
		{
			console.log('Actualizacion del Empleado');
			data.csfechac = new Date().toLocaleString();
			return upempl.apply(this,arguments);
		};
	});*/
};
