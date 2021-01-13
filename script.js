let data = [{
    name: 'Viet Nam',
    type: 'country',
    code: 'vn',
    items: [{
        name: 'Ho Chi Minh',
        type: 'province',
        code: 'hcm',
        items: [{
            name: 'Quan 1',
            type: 'district',
            code: 'd1',
            items: [{
                name: 'Nguyen Cu Trinh',
                type: 'ward',
                code: 'nct',
            }, {
                name: 'Ben Thanh',
                type: 'ward',
                code: 'bt',
            }]
        }, {
            name: 'Quan 3',
            type: 'district',
            code: 'd3',
            items: [{
                name: 'Phuong 1',
                type: 'ward',
                code: 'w1',
            }, {
                name: 'Phuong 3',
                type: 'ward',
                code: 'w3',
            }]
        }, {
            name: 'Quan 10',
            type: 'district',
            code: 'd10',
            items: [{
                name: 'Phuong 6',
                type: 'ward',
                code: 'w6',
            }, {
                name: 'Phuong 8',
                type: 'ward',
                code: 'w8',
            }]
        }]
    }]
}, {
    name: 'USA',
    type: 'country',
    code: 'usa',
    items: [{
        name: 'California',
        type: 'state',
        code: 'cl',
        items: [{
            name: 'Los Angeles',
            type: 'city',
            code: 'la'
        }]
    }]
}];

const divCheckEl = document.getElementById('checkboxs');
divCheckEl.innerHTML = create(data);

function create(data) {
    let html = '';
    html += '<ul>';
    data.forEach(e => {
        html += '<li>';
        html += `
            <input type="checkbox" name="${e.code}" id="${e.code}"/>
            <label for="${e.code}">${e.name}</label>
        `;

        if (e.hasOwnProperty('items')) html += create(e.items);
        html += '</li>';
    });
    html += '</ul>';
    return html;
}


$('input[type="checkbox"]').change(function(e) {

    var checked = $(this).prop("checked"), container = $(this).parent();
  
    container.find('input[type="checkbox"]').prop({ indeterminate: false, checked: checked });
  
    function checkSiblings(el) {
  
      var parent = el.parent().parent(), all = true;
  
      el.siblings().each(function() {
        all = ($(this).children('input[type="checkbox"]').prop("checked") === checked);
      });
      
      if (all && checked) {
  
        parent.children('input[type="checkbox"]').prop({ indeterminate: false, checked: checked });
  
        checkSiblings(parent);
  
      } else if (all && !checked) {
  
        parent.children('input[type="checkbox"]').prop("checked", checked);
        parent.children('input[type="checkbox"]').prop("indeterminate", (parent.find('input[type="checkbox"]:checked').length > 0));
        checkSiblings(parent);
  
      } else {
  
        el.parents("li").children('input[type="checkbox"]').prop({ indeterminate: true, checked: false });
  
      }
  
    }
  
    checkSiblings(container);
  });
