node-batch-aerender
===================

Batch rendering lots of compositions in After Effects really gets progressively slow... this allows you make it not suck as bad.

The time it takes to render frames goes from 0-1s per frame to 20s per frame..... this is a test to see if I can hack around that issue.

Essentially this will kill the render process after every composition is rendered and create a new process, which I think will somehow prevent the inevitable bogging down of my machine by After Effects batch render.
