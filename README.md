node-batch-aerender
===================

Batch rendering lots of compositions in After Effects really gets progressively slow... this allows you make it not suck as bad.

The time it takes to render frames goes from 0-1s per frame to 20s per frame..... this is a test to see if I can hack around that issue.

Essentially this will kill the render process after every composition is rendered and create a new process, which I think will somehow prevent the inevitable bogging down of my machine by After Effects batch render.


Update - 11-7-2014
===================
I was able to keep batch render time down to 0-1s per frame using a synchronous program. Which worked perfectly for rendering one composition after another. 

But...I got greedy and rewrote the code to use node's cluster module to run multiple renders in parallel using half of the cpus available... Essentially I was able to render 4 videos at once in about 8 minutes time. But his somehow kept the aerendercore process alive, which caused the next round of videos to start bogging down because that process was still kept alive. 

I plan on fixing that and making sure the associated aerendercore process truly gets killed for a clean slate and keep the parallel times down to 0-1s per frame, FTW!

The goal is to be able to create a mini batch render farm on one pc, spreading the renders across a portion of your computers CPUs.
