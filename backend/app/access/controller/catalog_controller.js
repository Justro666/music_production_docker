const {
  getAllCatalog,
  userCataDetail,
  userCataDetails,
} = require('../services/t6_service');
const { request } = require('../services/t19_service');
const helper = require('../../util/helper');

const getCatalog = async (req, res, next) => {
  try {
    let data = await getAllCatalog();
    helper.fmsg(res, process.env.SUCCESSFUL, '', { Catalog: data });
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, 'Controller Error');
  }
};

const requestCata = async (req, res, next) => {
  try {
    let data = await request(req.body);
    helper.fmsg(res, process.env.SUCCESSFUL, '', { CataReq: data });
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, 'Controller Error');
  }
};

const getCataForMusic = async (req, res, next) => {
  try {
    let data = await userCataDetail(req.body.user);
    helper.fmsg(res, process.env.SUCCESSFUL, '', { CataReq: data });
  } catch (error) {
    helper.fmsg(res, process.env.SERVER_ERROR, 'Controller Error');
  }
};

const getCataDetail = async (req, res, next) => {
  try {
    // console.log(req.body.user);
    let data = await userCataDetails(req.body.user);
    return helper.fmsg(res, process.env.SUCCESSFUL, '', { CataReq: data });
  } catch (error) {
    return helper.fmsg(res, process.env.SERVER_ERROR, 'Controller Error');
  }
};

module.exports = { getCatalog, requestCata, getCataForMusic, getCataDetail };
