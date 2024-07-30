const httpStatus = require("http-status");
const { abortIf } = require("../utils/responder");
const { verifyToken } = require("../utils/tokenManagement");
const XLSX = require("xlsx");
const csv = require("csvtojson");
const genericRepo = require("../repository");

const verify = (role) => async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  abortIf(!token || token == "", httpStatus.FORBIDDEN, "You shall not pass");
  const data = verifyToken(token);
  abortIf(!data, httpStatus.FORBIDDEN, "You shall not pass");
  const user = await genericRepo
    .setOptions(role, {
      selectOptions: ["id"],
    })
    .findOne();
  abortIf(!user, httpStatus.FORBIDDEN, "You shall not pass");
  const id = data.id;
  res.locals.user = data;
  next();
};

const formatSheet = async (req, res, next) => {
  let body;
  // get file type and format accordingly
  if (req?.files) {
    abortIf(
      req?.files?.sheet && req?.files?.csv,
      httpStatus.BAD_REQUEST,
      "Please either load a CSV or an XLSX file."
    );
    abortIf(
      !req?.files?.sheet && !req?.files?.csv,
      httpStatus.BAD_REQUEST,
      "Please either load a CSV or an XLSX file."
    );
    if (req?.files?.sheet) {
      const workbook = XLSX.readFile(req?.files?.sheet.tempFilePath);
      const sheet_name_list = workbook.SheetNames;
      if (sheet_name_list.length === 1) {
        let result = [];
        for (const sheetName of sheet_name_list) {
          let xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
          const format = this.generateBulkTxnDetails(xlData);
          result = format;
        }
        body = result;
      }
    } else if (req?.files?.csv) {
      body = await csv().fromFile(req?.files?.csv.tempFilePath);
    }
    req.body = body;
    next();
  } else {
    next();
  }
};

module.exports = {
  verify,
  formatSheet,
};
