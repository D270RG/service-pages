const PORT = 4000;

const express = require("express");
const cors = require("cors");
const db = require("./database.client");
const fc = require("./file.connector");
const app = express();

const corsOptions = {
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: true,
};

app.use(cors(corsOptions));

// TODO:
// app.get('/paths', (req, res) => {
// 	db.getPaths().then((pathRows) => {
// 		let resObject = {};
// 		pathRows.forEach((pathRow) => {
// 			resObject[pathRow.component] = pathRow.path;
// 		});
// 		res.status(200), json(JSON.stringify(resObject));
// 	});
// });
const authMiddleware = {
  userAlreadyExists: async function (req, res, next) {
    let userExistance = await db.checkUserExistance(req.body.login);
    if (userExistance) {
      res.status(503).json({
        rejected: "username",
        stage: "check",
        reason: "userExists",
      });
      return;
    }
    next();
  },
  userNotExists: async function (req, res, next) {
    let userExistance = await db.checkUserExistance(req.body.login);
    if (!userExistance) {
      res.status(503).json({
        rejected: "username",
        stage: "check",
        reason: "userNotExists",
      });
      return;
    }
    next();
  },
  sessionAlreadyExists: async function (req, res, next) {
    if (req.session) {
      let sessionCheck = await db.checkSession(
        req.body.login,
        req.body.session
      );
      if (sessionCheck) {
        res.status(200).json({ sessionId: req.body.session });
        return;
      }
    }
    next();
  },
  password: async function (req, res, next) {
    let passwordCheck = await db.checkUserPassword(req.body.password);
    if (!passwordCheck) {
      res
        .status(503)
        .json({ rejected: "password", stage: "check", reason: "incorrect" });
      return;
    }
    next();
  },
};
const sessionCheckMiddleware = {
  sessionExists: async function (req, res, next) {
    if (req.body.session) {
      let sessionCheck = await db.checkSession(
        req.body.login,
        req.body.session
      );
      if (sessionCheck) {
        req.locals.sessionExists = true;
        next();
      }
    }
    req.locals.session = false;
    next();
  },
};
const validationMiddleware = {
  loginValidations: async function (req, res, next) {
    let loginValidation = await db.validateLogin(req.body.login);
    if (!loginValidation.valid) {
      res.status(503).json({
        rejected: "username",
        stage: "validation",
        reason: loginValidation.reason,
      });
      return;
    }
    next();
  },
  passwordValidations: async function (req, res, next) {
    let passwordValidations = await db.validatePasswordInput(req.body.password);
    for (let [key, value] in Object.entries(passwordValidations)) {
      if (!value) {
        res
          .status(503)
          .json({ rejected: "password", stage: "validation", reason: key });
        return;
      }
    }
    next();
  },
};
//UPDATE
app.post(
  "/addUser",
  [
    express.json(),
    authMiddleware.userAlreadyExists,
    validationMiddleware.loginValidations,
    validationMiddleware.passwordValidations,
  ],
  async (req, res) => {
    let userRegistration = await db.addUser(req.body.login, req.body.password);
    if (!userRegistration) {
      res.status(503).json({ rejected: "addUser", stage: "db", reason: "db" });
    }
    res.status(200);
  }
);
app.post(
  "/deleteUser",
  [express.json(), authMiddleware.userNotExists],
  async (req, res) => {
    const login = req.body.login;
    let userDeletion = await db.deleteUser(login);
    if (!userDeletion) {
      res
        .status(503)
        .json({ rejected: "deleteUser", stage: "db", reason: "db" });
      return;
    }
    res.status(200);
  }
);
app.post(
  "/login",
  [
    express.json(),
    authMiddleware.sessionAlreadyExists,
    authMiddleware.userNotExists,
    authMiddleware.password,
  ],
  async (req, res) => {
    let newSession = await db.addSession(req.body.login);
    if (newSession.affected) {
      res.status(200).json({ sessionId: session.id });
    } else {
      res.status(503).json({ rejected: "login", stage: "db", reason: "db" });
    }
  }
);

app.post("/addFlyer", express.json(), async (req, res) => {
  const flyer = req.body.flyer;
  let insertionResult = await addFlyer(flyer);
  if (insertionResult.affected) {
    res.status(200);
  } else {
    res.status(503).json({ rejected: "addFlyer", stage: "db", reason: "db" });
  }
});
app.post("/deleteFlyer", express.json(), async (req, res) => {
  const id = req.body.id;
  let deletionResult = await db.deleteFlyer(id);

  if (deletionResult.affected) {
    res.status(200);
  } else {
    res
      .status(503)
      .json({ rejected: "deleteFlyer", stage: "db", reason: "db" });
  }
});

//READ
app.post("/flyers", express.json(), async (req, res) => {
  const language = req.body.language;
  console.log("received lang", language);
  let flyerRows = await db.getFlyers(language);
  res.status(200).json(JSON.stringify(flyerRows.rows));
});
app.post("/prices", express.json(), async (req, res) => {
  console.log("getting prices", req.body);
  let priceRows = await db.getPrices(req.body.paths, req.body.language);

  let resObject = {};
  resObject = { ...priceRows.rows };
  priceRows.rows.forEach((priceRow) => {
    //creating normalized data
    if (!resObject.hasOwnProperty(priceRow.path)) {
      resObject[priceRow.path] = [];
    }
    resObject[priceRow.path].push(priceRow);
  });
  console.log("sending");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(JSON.stringify(resObject));
});
app.post("/serviceDescriptions", express.json(), (req, res) => {
  let locale = req.body.locale;
  const serviceDescriptions = require("./serviceDescriptions.json");
  console.log("requrested descs", locale);
  if (translations.hasOwnProperty(locale)) {
    console.log("sending descriptions", locale);
    res
      .status(200)
      .json(JSON.stringify(serviceDescriptions[locale].serviceDescriptions));
  } else {
    res.status(404);
  }
});
app.post("/translations", express.json(), (req, res) => {
  let locale = req.body.locale;
  const translations = require("./translations.json");
  console.log("translations req", req.body);
  if (translations.hasOwnProperty(locale)) {
    res.status(200).json(JSON.stringify(translations[locale]));
  } else {
    res.status(404);
  }
});
let server = app.listen(PORT, function () {
  console.log(`Server is running on ${PORT}`);
});
