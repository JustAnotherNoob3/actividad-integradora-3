import { Router } from "express";
import { __dirname, isValidPassword } from "../utils/misc_utils.js";
import { daoUsers } from "../Repositories/index.js";


const userRouter = Router();

userRouter.get('/newPass',async (req, res) => {

});

userRouter.get('/premium/:uid', async (req, res) => {
    try{
    let uid = req.params.uid;
    if((await daoUsers.getById(uid)).role == 'premium')daoUsers.update(uid, {role:"user"});
    else daoUsers.update(uid, {role:"premium"});
    res.status(200).send({ status: "success" });
    } catch {
        res.status(400).send({ status: "error", error: error.toString() });
    }
});

export default userRouter;
