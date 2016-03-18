var loopback = require('loopback');

module.exports = function(Mefcausad) {
	Mefcausad.on('dataSourceAttached', function(obj)
	{
		var create = Mefcausad.create;
		Mefcausad.create = function(model,cb)
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
