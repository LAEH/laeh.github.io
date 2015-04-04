#!/bin/sh -e

# Job name
JOB=server
CLUSTER=smf1
ROLE=laeh
ENV=devel

# Pack:
tar czvf $JOB.tgz .

# Deploy:
packer add_version --cluster=$CLUSTER $ROLE $JOB $JOB.tgz
rm $JOB.tgz

# Run Aurora job:
aurora job killall $CLUSTER/$ROLE/$ENV/$JOB --max-total-failures=1
aurora deployment create $CLUSTER/$ROLE/$ENV/$JOB deploy.aurora -r
