import type { Request, Response } from 'express';
import type { KeystoneContext } from '@keystone-6/core/types';

export async function cbCreateHardwareIssue(req: Request, res: Response) {
    try{
    // This was added by the context middleware in ../keystone.ts
    const context = (req as any).context as KeystoneContext;
    const {irrigator_id, status} = req.body;
    // Now we can use it to query the Keystone Schema
    const result = await context.query.hdw_issue.createOne({
        data: {
          irrigator: {connect: {integration_id: irrigator_id}},
          creation_date: (new Date()).toISOString(),
          status: "in-field",
          automatic_diagnostic: Number(status),
        },
        query: 'id irrigator {id integration_id} creation_date status automatic_diagnostic',
      });
    // And return the result as JSON
    res.json(result);
    }
    catch(e){
        res.status(400).json(e);
    }
  }
  