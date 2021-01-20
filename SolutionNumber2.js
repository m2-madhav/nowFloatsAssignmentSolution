let obj = [
  {
    name: "x1",
    value: "100",

    levels: [
      {
        name: "x11",
        value: "101",

        levels: [
          {
            name: "x12",
            value: "1011"
          }
        ]
      }
    ]
  },
  {
    name: "x2",
    value: "100",

    levels: [
      {
        name: "x21",
        value: "201",

        levels: [
          {
            name: "x22",
            value: "2011"
          },
          {
            name: "x23",
            value: "20110"
          }
        ]
      },
      {
        name: "x32",
        value: "202"
      }
    ]
  }
];

var flat = {};
function repeat(object) {
  for (var i in object) {
    var objd = object[i];
    flat[objd["name"]] = objd["value"];
    for (const j in objd) {
      if (j === "levels") repeat(objd[j]);
    }
  }
}
repeat(obj);

var obj2 = {},
  obj3 = {},
  arr = [],
  flag;
for (const i in flat) {
  if (i === "x2") break;
  arr = [];
  flag = false;
  for (const j in flat) {
    if (j === "x2") break;
    if (j === i) flag = true;
    if (flag) arr.push(flat[j]);
  }
  obj2[i] = arr;
}

var flatslice = Object.keys(flat)
  .slice(3, 8)
  .reduce((result, key) => {
    result[key] = flat[key];
    return result;
  }, {});

for (const i in flatslice) {
  if (i === "x2") {
    arr = [];
    flag = false;
    for (const j in flatslice) {
      if (j === i) flag = true;
      if (flag) arr.push(flatslice[j]);
    }
    obj3[i] = arr;
  } else if (i === "x22") {
    arr = [];
    flag = false;
    for (const j in flatslice) {
      if (j === "x22") arr.push(flatslice[j]);
    }
    obj3[i] = arr;
  } else if (i === "x32") {
    arr = [];
    flag = false;
    for (const j in flatslice) {
      if (j === "x32") arr.push(flatslice[j]);
    }
    obj3[i] = arr;
  } else {
    arr = [];
    flag = false;
    for (const j in flatslice) {
      if (j === "x32") break;
      if (j === i) flag = true;
      if (flag) arr.push(flatslice[j]);
    }
    obj3[i] = arr;
  }
}

const desiredOutput = {
  ...obj2,
  ...obj3
};

console.log(desiredOutput);
