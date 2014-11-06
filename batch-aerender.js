var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var path = require('path');

var projectPath = '"/Volumes/Miami Muscle C/FX by Mat Silva/Miami Muscle/1_Project Edit/After Effects/Miami Muscle FX Sept 18_cc2014_textrenamed_spanish.aep"';
var renderComps = [
      // '"MM15_v1_2013-07-03_FX_LOCKED"',
      // '"MM16_v1_2013-07-19_FX_LOCKED"',
      // '"MM17_v2a_2013-07-15_FX_LOCKED"',
      // '"MM23_v1a_2013-07-15_FX_LOCKED"',
      // '"MM24_v1_2013-07-19_FX_LOCKED"',
      // '"MM25_v1_2013-07-20_FX_LOCKED"',
      //'"MM29_v1_2013-07-20_FX_LOCKED"',
      // '"MM30_v2_2013-07-26_FX_LOCKED"',
      // '"MM31_v3_2013-07-25_FX_LOCKED"',
      '"MM32_v1_2013-07-21_FX_LOCKED"',
      '"MM33_v1_2013-07-18_FX_LOCKED"',
      '"MM34_v1_2013-07-20_FX_LOCKED"',
      '"MM35_v2a_2013-07-25_FX_LOCKED"',
      '"MM36_v1_2013-07-23_FX_LOCKED"',
      '"MM37_v2_2013-07-30_FX_LOCKED"',
      'MM39_v1_2013-07-24_FX_LOCKED"'
      ];
var execPath = '"/Applications/Adobe After Effects CC 2014/aerender"';
var c = 0;
var finished = false;




var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < Math.floor(numCPUs/2); i++) {
    var worker = cluster.fork();
    worker.send(c);
    c++;
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
    if(!finished) {
      var worker = cluster.fork();
      worker.send(c);
      c++;
    }else{
      console.log('Finished batch render');
    }
  });
} else {
 
  process.on('message', function(index) {
    var renderArgs = [
                "-project", projectPath,
                "-comp", renderComps[index]
                //"-OMtemplate", 'H.264',
            ];

    console.log('starting ' + renderComps[index]);

    var aerender = exec(execPath + ' ' + renderArgs.join(' '));
    aerender.stdout.on('data', function(data) {
        console.log('aerender stdout: ' + data);
        if (data.toString().indexOf('Finished composition') != -1) {
            console.log(renderComps[index] + ' successfully rendered');

        }
    });

    aerender.stderr.on('data', function(data) {
        console.log('aerender stderr: ' + data);
    });

    aerender.on('close', function(code) {
      if(index > renderComps.length) finished = true;
        console.log('aerender child process exited with code ' + code);
        //process.exit(0);
    });
  });
}
