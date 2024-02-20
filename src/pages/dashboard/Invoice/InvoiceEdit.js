import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import InvoiceNewEditForm from '../../../sections/@dashboard/invoice/new-edit-form';

// ----------------------------------------------------------------------

export default function InvoiceEdit() {
  const { themeStretch } = useSettings();

  const { id } = useParams();

  return (
    <Page title="Invoices: Edit">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit invoice"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Invoices', href: PATH_DASHBOARD.invoice.list },
            { name: '' },
          ]}
        />

        <InvoiceNewEditForm isEdit />
      </Container>
    </Page>
  );
}
