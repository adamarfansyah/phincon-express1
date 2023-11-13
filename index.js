import express from "express";
import joi from "joi";
import fs from "fs";

const app = express();
const PORT = 3000;
const database = "./database/db.json";
const data = JSON.parse(fs.readFileSync(database));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const handleServerError = (res) => {
  return res.status(500).json({ message: "Internal server error" });
};

const handleClientError = (res, status, message) => {
  return res.status(status).json({ message });
};

app.get("/all/:type", (req, res) => {
  try {
    const { type } = req.params;
    const listType = Object.keys(data);

    if (!listType.includes(type)) {
      return handleClientError(res, 404, "URL Not found");
    }
    return res.status(200).json({ data: data[type], status: "Success" });
  } catch (error) {
    return handleServerError(error);
  }
});

app.get("/all/employee/:subType", (req, res) => {
  try {
    const { subType } = req.params;

    const listType = Object.keys(data);
    if (!listType.includes("employee") || !data.employee[subType]) {
      return handleClientError(res, 404, "URL Not found");
    }

    const selectedSubType = data.employee[subType];

    return res.status(200).json({ data: selectedSubType, status: "Success" });
  } catch (error) {
    return handleServerError(res);
  }
});

app.get("/all/employee/:subType/:name", (req, res) => {
  try {
    const { subType, name } = req.params;
    const listType = Object.keys(data);

    if (
      !listType.includes("employee") ||
      !data.employee[subType].find((item) => item.name.toLowerCase() === name.toLowerCase())
    ) {
      return handleClientError(res, 404, "URL Not found");
    }
    const selectedName = data.employee[subType].filter(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
    return res.status(200).json({ data: selectedName[0], status: "Success" });
  } catch (error) {
    return handleServerError(res);
  }
});

app.get("/all/employee/:subType/status/:status", (req, res) => {
  try {
    const { subType, status } = req.params;
    const listType = Object.keys(data["employee"]);
    if (
      !listType.includes(subType) ||
      !data["employee"][subType].find((item) => item.status.toLowerCase() === status.toLowerCase())
    ) {
      return handleClientError(res, 404, "URL Not found");
    }
    const selectedStatus = data["employee"][subType].filter(
      (item) => item.status.toLowerCase() === status.toLowerCase()
    );
    return res.status(200).json({ data: selectedStatus, status: "Success" });
  } catch (error) {
    return handleServerError(res);
  }
});

app.post("/create/employee/divisi", (req, res) => {
  try {
    const newData = req.body;

    const schema = joi.object({
      name: joi.string().min(3).required(),
      salary: joi.number().required(),
      married: joi.boolean().required(),
      divisi: joi.string().min(5).required(),
      status: joi.string().min(3).required(),
    });

    const { error } = schema.validate(newData);
    const isEmployeeNameExist = data?.employee?.divisi?.find(
      (item) => item.name.toLowerCase() === newData.name.toLowerCase()
    );

    if (error) {
      return handleClientError(res, 404, error?.details[0]?.message);
    }

    if (isEmployeeNameExist) {
      return handleClientError(res, 400, "Data Already Used");
    }

    data.employee.divisi.push(newData);

    fs.writeFileSync(database, JSON.stringify(data));

    return res.status(201).json({ data: data?.employee?.divisi, status: "Success" });
  } catch (error) {
    return handleServerError(res);
  }
});

app.post("/create/companyList", (req, res) => {
  try {
    const newData = req.body;

    const schema = joi.object({
      name: joi.string().min(3).required(),
      description: joi.string().min(3).required(),
    });

    const { error } = schema.validate(newData);
    const isCompanyExist = data?.companyList.find(
      (item) => item.name.toLowerCase() === newData.name.toLowerCase()
    );

    if (error) {
      return handleClientError(res, 404, error?.details[0]?.message);
    }

    if (isCompanyExist) {
      return handleClientError(res, 400, "Data Already Used");
    }

    data.companyList.push(newData);

    fs.writeFileSync(database, JSON.stringify(data));

    return res.status(201).json({ data: data?.companyList, status: "Success" });
  } catch (error) {
    return handleServerError(res);
  }
});

app.post("/create/employee/projectList", (req, res) => {
  try {
    const newData = req.body;

    const schema = joi.object({
      name: joi.string().min(3).required(),
      deadline: joi.string().required(),
      clientName: joi.string().min(3).required(),
      project: joi.string().min(3).required(),
      status: joi.string().min(3).required(),
    });

    const { error } = schema.validate(newData);
    const isProjectExist = data?.employee.projectList.find(
      (item) => item.name.toLowerCase() === newData.name.toLowerCase()
    );

    if (error) {
      return handleClientError(res, 404, error?.details[0]?.message);
    }

    if (isProjectExist) {
      return handleClientError(res, 400, "Data Already Used");
    }

    data.employee.projectList.push(newData);

    fs.writeFileSync(database, JSON.stringify(data));

    return res.status(201).json({ data: data?.employee.projectList, status: "Success" });
  } catch (error) {
    return handleServerError(res);
  }
});

app.put("/edit/employee/divisi/:name", (req, res) => {
  try {
    const { name } = req.params;
    const newData = req.body;

    const schema = joi.object({
      name: joi.string().min(3).required(),
      salary: joi.number().required(),
      married: joi.boolean().required(),
      divisi: joi.string().min(5).required(),
      status: joi.string().min(3).required(),
    });

    const { error } = schema.validate(newData);
    const isEmployeeNameExist = data?.employee.divisi?.find(
      (item) => item.name.toLowerCase() === newData.name.toLowerCase()
    );

    if (!data.employee.divisi.find((el) => el.name.toLowerCase() === name.toLowerCase())) {
      return handleClientError(res, 404, "Data Not Found");
    }

    if (error) {
      return handleClientError(res, 404, error?.details[0]?.message);
    }

    if (isEmployeeNameExist) {
      return handleClientError(res, 400, "Data Already Used");
    }

    const filtered = data.employee.divisi.filter(
      (item) => item.name.toLowerCase() !== name.toLowerCase()
    );
    filtered.push(newData);

    data.employee.divisi = filtered;

    fs.writeFileSync(database, JSON.stringify(data));

    return res.status(201).json({ data: data?.employee.divisi, status: "Success" });
  } catch (error) {
    return handleServerError(res);
  }
});

app.put("/edit/employee/projectList/:name", (req, res) => {
  try {
    const { name } = req.params;
    const newData = req.body;

    const schema = joi.object({
      name: joi.string().min(3).required(),
      deadline: joi.string().min(3).required(),
      clientName: joi.string().min(3).required(),
      project: joi.string().min(3).required(),
      status: joi.string().min(3).required(),
    });

    const { error } = schema.validate(newData);
    const isProjectName = data?.employee.projectList?.find(
      (item) => item.name.toLowerCase() === newData.name.toLowerCase()
    );

    if (!data.employee.projectList.find((item) => item.name.toLowerCase() === name.toLowerCase())) {
      return handleClientError(res, 404, "Data Not Found");
    }

    if (error) {
      return handleClientError(res, 404, error?.details[0]?.message);
    }

    if (isProjectName) {
      return handleClientError(res, 400, "Data Already Used");
    }

    const filtered = data.employee.projectList.filter(
      (item) => item.name.toLowerCase() !== name.toLowerCase()
    );
    filtered.push(newData);

    data.employee.projectList = filtered;

    fs.writeFileSync(database, JSON.stringify(data));

    return res.status(201).json({ data: data?.employee.projectList, status: "Success" });
  } catch (error) {
    return handleServerError(res);
  }
});

app.delete("/delete/employee/:subType/:name", (req, res) => {
  try {
    const { subType, name } = req.params;

    if (!data.employee[subType].find((item) => item.name.toLowerCase() === name.toLowerCase())) {
      return handleClientError(res, 404, "Data Not Found");
    }

    const filtered = data.employee[subType].filter(
      (item) => item.name.toLowerCase() !== name.toLowerCase()
    );
    data.employee[subType] = filtered;
    fs.writeFileSync(database, JSON.stringify(data));

    return res.status(200).json({ data: data.employee[subType], message: "Success" });
  } catch (error) {
    return handleServerError(res);
  }
});

app.delete("/delete/companyList/:name", (req, res) => {
  try {
    const { name } = req.params;

    if (!data.companyList.find((item) => item.name.toLowerCase() === name.toLowerCase())) {
      return handleClientError(res, 404, "Data Not Found");
    }

    const filtered = data.companyList.filter(
      (item) => item.name.toLowerCase() !== name.toLowerCase()
    );
    data.companyList = filtered;
    fs.writeFileSync(database, JSON.stringify(data));

    return res.status(200).json({ data: data.companyList, message: "Success" });
  } catch (error) {
    return handleServerError(res);
  }
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
