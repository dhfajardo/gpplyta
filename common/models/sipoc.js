var loopback = require('loopback');
module.exports = function(Sipoc) {
	Sipoc.observe('before save', function attibutesUpCrt(ctx, next)
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
			}
			else
			{
				ctx.data.csfecham = new Date();
				var context = loopback.getCurrentContext();
				var accessToken = context.get('accessToken');
				ctx.data.csusuario = accessToken.userId;
			}
			next();
		});
};
