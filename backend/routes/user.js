const express=require('express');
const userRouter=express.Router();
const userController=require('../controller/userController')
/**
 * @openapi
 * /api/users:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
userRouter.get('/',userController.getUsers)
/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Welcome to swagger-jsdoc!
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *               format: email
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
userRouter.post('/',userController.createUser)

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Welcome to swagger-jsdoc!
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The user to create.
 *         schema:
 *           type: integer
 *           properties:
 *             id:
 *               type: string
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 *   delete:
 *     summary: Welcome to swagger-jsdoc!
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The user to create.
 *         schema:
 *           type: integer
 *           properties:
 *             id:
 *               type: string
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 *   put:
 *     summary: Welcome to swagger-jsdoc!
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The user to create.
 *         schema:
 *           type: integer
 *           properties:
 *             id:
 *               type: string
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *               format: email
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 *      
 */
userRouter.route('/:id')
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports=userRouter;