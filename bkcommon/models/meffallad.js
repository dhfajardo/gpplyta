var loopback = require('loopback');

module.exports = function(Meffallad) {
	Meffallad.on('dataSourceAttached', function(obj)
	{
		var create = Meffallad.create;
		Meffallad.create = function(model,cb)
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
