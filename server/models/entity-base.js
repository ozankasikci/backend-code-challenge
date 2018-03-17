module.exports = function (EntityBase) {
  EntityBase.observe('before save', function removeUnwantedField(ctx, next) {
    if (ctx.instance) {

      if (ctx.isNewInstance && !ctx.instance.createdAt) {
        ctx.instance.createdAt = new Date();
        ctx.instance.updatedAt = new Date();
      } // else if (!ctx.instance.updatedAt) {
      ctx.instance.updatedAt = new Date();
      // }
    }

    else {
      ctx.data.updatedAt = new Date();
    }
    next();
  });
};

