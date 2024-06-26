export function authed(req, res, next){
    if(req.session && req.session.user)
    return next();
    return res.status(401).send({ status: "error", error: "Unauthorized" });
}
export function notAuthed(req, res, next){
    if(!req.session || !req.session.user) return next();
    res.redirect("/products");
}

export function isAdmin(req, res, next){
    if(req.session && req.session.user && req.session.user.role == "admin")
        return next();
        return res.status(401).send({ status: "error", error: "Only an admin can perform this action." });
}
export function isAdminOrPremium(req, res, next){
    if(!req.session || !req.session.user )
        return res.status(401).send({ status: "error", error: "Unauthorized to perform this action." });
    if((req.session.user.role != "admin" && req.session.user.role != "premium"))
        return res.status(401).send({ status: "error", error: "Unauthorized to perform this action." });
    req.role = req.session.user.role;
        return next();
}
export function isNotAdmin(req, res, next){
    if(!(req.session && req.session.user && req.session.user.role == "admin"))
        return next();
        return res.status(401).send({ status: "error", error: "An admin cannot perform this action." });
}