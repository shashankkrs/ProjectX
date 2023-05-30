const Activity = require("../model/activity");

module.exports = (type, data) => {
  let description = "";
  switch (type) {
    case "add_duty": {
      description = `Duty Added for ${data.driver.name} on ${data.vehicle.name},${data.vehicle.registration_no}`;
      link = `/admin/duties/${data.id}`;
    }
    case "end_duty": {
      description = `Duty Ended for ${data.driver.name} on ${data.vehicle.name},${data.vehicle.registration_no}`;
      link = `/admin/duties/${data.id}`;
    }
    case "added_oil_to_stock": {
      description = `Added ${data.quantity}L of ${data.oil.name} to Stock`;
      link = `/admin/oilstockregister/voucher/${data.id}`;
    }
    case "allocated_oil": {
      description = `Allocated ${data.quantity}L of ${data.oil.name} to ${data.vehicle.name},${data.vehicle.registration_no}`;
      link = `/admin/oilstockregister/voucher/${data.id}`;
    }
    default: {
      description = "";
    }
  }
};
