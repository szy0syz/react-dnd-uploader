import { Card, CardContent, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import { MultiplefileUploadField } from '../upload/MultiplefileUploadField';

export default function Home() {
  return (
    <Card>
      <CardContent>
        <Formik initialValues={{}} onSubmit={() => {}}>
          {({ values, errors }) => (
            <Form>
              <Grid container spacing={2} direction="column">
                <MultiplefileUploadField />
              </Grid>

              <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
