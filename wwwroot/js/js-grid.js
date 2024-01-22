(function ($) {
  'use strict';
  $(function () {

    //basic config
    if ($("#js-grid").length) {
      $("#js-grid").jsGrid({
        height: "500px",
        width: "100%",
        filtering: true,
        editing: true,
        inserting: true,
        sorting: true,
        paging: true,
        autoload: true,
        pageSize: 15,
        pageButtonCount: 5,
        deleteConfirm: "Do you really want to delete the client?",
        data: db.clients,
        fields: [{
            name: "Name",
            type: "text",
            width: 150
          },
          {
            name: "Age",
            type: "number",
            width: 50
          },
          {
            name: "Address",
            type: "text",
            width: 200
          },
          {
            name: "Country",
            type: "select",
            items: db.countries,
            valueField: "Id",
            textField: "Name"
          },
          {
            name: "Married",
            title: "Is Married",
            itemTemplate: function (value, item) {
              return $("<div>")
                .addClass("form-check mt-0")
                .append(
                  $("<label>").addClass("form-check-label")
                  .append(
                    $("<input>").attr("type", "checkbox")
                    .addClass("form-check-input")
                    .attr("checked", value || item.Checked)
                    .on("change", function () {
                      item.Checked = $(this).is(":checked");
                    })
                  )
                  .append('<i class="input-helper"></i>')
                );
            }
          },
          {
            type: "control"
          }
        ]
      });
    }


    //Static
    if ($("#js-grid-static").length) {
      $("#js-grid-static").jsGrid({
        height: "500px",
        width: "100%",

        sorting: true,
        paging: true,

        data: db.complaints,

        fields: [{
            name: "ComplaintNumber",
            title: "Complaint No.",
            type: "text",
            width: 80
          },
          {
            name: "Name",
            type: "text",
            width: 80
          },
          {
            name: "Category",
            type: "text",
            width: 120
          },
          {
            name: "Status",
            title: "Status",
            itemTemplate: function (value, item) {
              if (value == "pending") {
                return $("<label>").addClass("badge badge-outline-danger ").html("Open");
              } else if (value == "resolved") {
                return $("<label>").addClass("badge badge-outline-success ").html("Closed");
              } else if (value == "in-process") {
                return $("<label>").addClass("badge badge-outline-warning ").html("In Process");
              } else {
                console.log("Status: " + value);
              }
            }
          },
          {
            name: "RegisteredOn",
            title: "Registered On",
            type: "text",
            width: 150
          },
          {
            name: "DueOn",
            title: "Due On",
            width: 150,
            itemTemplate: function (value, item) {
              if(value=="8:30 PM, Sat, May 15, 2021"){
                return $("<label>").addClass("text-danger ").html(value);
              }else{
                return value;
              }
              
            }
          },
          {
            name: "Action",
            itemTemplate: function (actionvalue, item) {
              var actionHtml='<div class="btn-group" role="group" aria-label="Basic example">'+
              '<button type="button" class="action-btn btn btn-xs btn-outline-secondary icon-btn"><i class="fa fa-cog"></i></button>'+
              '<a href="complaint-details.php" target="_blank" type="button" class="btn btn-xs btn-outline-secondary icon-btn"><i class="fa fa-eye"></i></a>'+
              '</div>';
              return $("<div>").html(actionHtml);
            }
          }
        ]
      });
    }




    if ($("#js-grid-static-commission").length) {
      $("#js-grid-static-commission").jsGrid({
        height: "500px",
        width: "100%",

        sorting: true,
        paging: true,

        data: db.complaints,

        fields: [{
            name: "ComplaintNumber",
            title: "Complaint No.",
            type: "text",
            width: 80
          },
          {
            name: "Name",
            title: "Assigned To",
            type: "text",
            width: 80
          },
          {
            name: "Category",
            type: "text",
            width: 120
          },
          {
            name: "Status",
            title: "Status",
            itemTemplate: function (value, item) {
              if (value == "pending") {
                return $("<label>").addClass("badge badge-outline-danger ").html("Open");
              } else if (value == "resolved") {
                return $("<label>").addClass("badge badge-outline-success ").html("Closed");
              } else if (value == "in-process") {
                return $("<label>").addClass("badge badge-outline-warning ").html("In Process");
              } else {
                console.log("Status: " + value);
              }
            }
          },
          {
            name: "RegisteredOn",
            title: "Registered On",
            type: "text",
            width: 150
          },
          {
            name: "DueOn",
            title: "Due On",
            width: 150,
            itemTemplate: function (value, item) {
              if(value=="8:30 PM, Sat, May 15, 2021"){
                return $("<label>").addClass("text-danger ").html(value);
              }else{
                return value;
              }
              
            }
          },
          {
            name: "Action",
            itemTemplate: function (actionvalue, item) {
              var actionHtml='<div class="btn-group" role="group" aria-label="Basic example">'+
              '<button type="button" class="action-btn btn btn-xs btn-outline-secondary icon-btn"><i class="fa fa-cog"></i></button>'+
              '<a href="complaint-details.php" target="_blank" type="button" class="btn btn-xs btn-outline-secondary icon-btn"><i class="fa fa-eye"></i></a>'+
              '</div>';
              return $("<div>").html(actionHtml);
            }
          }
        ]
      });
    }

    //sortable
    if ($("#js-grid-sortable").length) {
      $("#js-grid-sortable").jsGrid({
        height: "500px",
        width: "100%",

        autoload: true,
        selecting: false,

        controller: db,

        fields: [{
            name: "Name",
            type: "text",
            width: 150
          },
          {
            name: "Age",
            type: "number",
            width: 50
          },
          {
            name: "Address",
            type: "text",
            width: 200
          },
          {
            name: "Country",
            type: "select",
            items: db.countries,
            valueField: "Id",
            textField: "Name"
          },
          {
            name: "Married",
            title: "Is Married",
            itemTemplate: function (value, item) {
              return $("<div>")
                .addClass("form-check mt-0")
                .append(
                  $("<label>").addClass("form-check-label")
                  .append(
                    $("<input>").attr("type", "checkbox")
                    .addClass("form-check-input")
                    .attr("checked", value || item.Checked)
                    .on("change", function () {
                      item.Checked = $(this).is(":checked");
                    })
                  )
                  .append('<i class="input-helper"></i>')
                );
            }
          }
        ]
      });
    }

    if ($("#sort").length) {
      $("#sort").on("click", function () {
        var field = $("#sortingField").val();
        $("#js-grid-sortable").jsGrid("sort", field);
      });
    }

  });
})(jQuery);