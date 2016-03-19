var loopback = require('loopback');
module.exports = function(Mefaparicion) {
	Mefaparicion.observe('before save', function attibutesUpCrt(ctx, next)
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
};
