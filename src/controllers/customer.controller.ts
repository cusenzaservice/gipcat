// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request, checking for empty parameters
  if (
      !req.body.businessName ||
      !req.body.registeredOfficeAddress ||
      !req.body.registeredOfficeCity
    ) {
    res.status(400).send({
      message: "Required values are missing. Check documentation."
    });
    return;
  }

  // Create a Customer object
  const customer = {
    businessName: req.body.businessName,
    registeredOfficeAddress: req.body.registeredOfficeAddress,
    registeredOfficeCity: req.body.registeredOfficeCity,
    headquartersAddress: req.body.headquartersAddress ? req.body.headquartersAddress : null,
    headquartersCity: req.body.headquartersCity ? req.body.headquartersCity : null,
    fiscalCode: req.body.fiscalCode ? req.body.fiscalCode : null,
    vatNumber: req.body.vatNumber ? req.body.vatNumber : null,
    footNote: req.body.footNote ? req.body.footNote : null,
  };

  // Save the customer in the database
  Customer.create(customer)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Generic error while creating Customer."
      });
    });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Customer with an id
exports.findOne = (req, res) => {
  
};

// Update a Customer by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
  
};