var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var path = require('path');

var projectPath = '"/Volumes/Miami Muscle C/FX by Mat Silva/Miami Muscle/1_Project Edit/After Effects/FInal FX 2 - Nik (attempt 2)/Miami Muscle FX Aug 12_NH_LOCKED (converted) Spanish.aep"',
    renderComps = [
      '"MM22_v2a_2013-07-15_LOCKED"',
      '"MM26_v2_2013-07-26_LOCKED"',
      '"MM27_v2a_2013-07-26_LOCKED"',
      '"MM28_v2_2013-07-16_LOCKED"'
      ],
    execPath = '"/Applications/Adobe After Effects CC 2014/aerender"';

var renderComp = function(i){
    var renderArgs = [
                "-project", projectPath,
                "-comp", renderComps[i]
                //"-OMtemplate", 'H.264',
            ];
    console.log(renderArgs.join(' '));
    console.log('starting ' + renderComps[i]);
    var aerender = exec(execPath + ' ' + renderArgs.join(' '));

    aerender.stdout.on('data', function(data) {
        console.log('aerender stdout: ' + data);
        if (data.toString().indexOf('Finished composition') != -1) {
            console.log(renderComps[i] + ' successfully rendered');

        }
    });

    aerender.stderr.on('data', function(data) {
        console.log('aerender stderr: ' + data);
    });

    aerender.on('close', function(code) {
        console.log('aerender child process exited with code ' + code);
        if(i > renderComps.length) return console.log('batch render finished!')
        return renderComp((i+1))
    });
}

renderComp(0);
