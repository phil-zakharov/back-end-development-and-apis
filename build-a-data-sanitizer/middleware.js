export function inputCleaner(req, res, next) {
  if (req.body?.username) {
    req.body.username = req.body.username.toLowerCase()
  } 

  if (req.body?.comment) {
    req.body.comment = req.body.comment.replace(/<[^>]*>?/gm, '')
  }

  next()
}

export function inputValidator(req, res, next) {
  if (req.body?.username && req.body.username.length >= 3) {
    next()
    return;
  }

  if (res.redirect instanceof Function) {
    res.redirect('/form?error=Username must be at least 3 characters.')
  }
  
  return;
}