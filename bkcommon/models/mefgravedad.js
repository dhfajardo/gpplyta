var loopback = require('loopback');

module.exports = function(Mefgravedad) {
	Mefgravedad.on('dataSourceAttached', function(obj)
	{
		var create = Mefgravedad.create;
		Mefgravedad.create = function(model,cb)
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
