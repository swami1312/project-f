import * as React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import { Button } from '../../components/Buttons/Buttons';
import { TableComponent } from '../../components/Table/Table';
import { Icon } from '@iconify/react';
import useApiServices from '../../services/apiServices';
import apiEndPoints from '../../services/apiEndPoints';
import useHandleResponse from '../../Hooks/useHandleResponse';

const InventoryForm = () => {
  const [start, setStart] = React.useState('');
  const [end, setEnd] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [inventory, setInventory] = React.useState([]);
  const fileFormData = React.useRef(null);
  const { post } = useApiServices();
  const { handleResponse } = useHandleResponse();

  const validate = () => {
    const newErrors = {};

    if (start === '') newErrors.start = 'Start serial is required';
    if (end === '') newErrors.end = 'End serial is required';

    if (start !== '' && end !== '') {
      if (Number(start) >= Number(end)) {
        newErrors.start = 'Start must be less than End';
        newErrors.end = 'End must be greater than Start';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerate = () => {
    if (!validate()) return;

    const startNum = Number(start);
    const endNum = Number(end);

    const list = Array.from({ length: endNum - startNum + 1 }, (_, index) => ({
      id: startNum + index,
      status: 'Y',
    }));

    setInventory(list);
  };

  const handlePdfUpload = (event, id) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Only PDF files allowed');
      event.target.value = '';
      return;
    } else {
      const formData = new FormData();
      formData.append('file', file, file.name);
      fileFormData.current = formData;
      fileupload(formData, id);
      event.target.value = null;
    }
  };

  const fileupload = (fileFormData, id) => {
    post({
      apiUrl: apiEndPoints.postPdf('AOSH212', id),
      type: 'file',
      body: fileFormData,
      callBackFunction: (res) => {
        handleResponse(res, {
          success: () => {
            setInventory((prev) =>
              prev.map((item) =>
                item.id === id ? { ...item, pdf: res.data } : item
              )
            );
          },
        });
      },
    });
  };

  return (
    <>
      {/* Form */}
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <TextField
          label="Serial No Start"
          type="number"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          error={!!errors.start}
          helperText={errors.start}
          size="small"
        />

        <TextField
          label="Serial No End"
          type="number"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          error={!!errors.end}
          helperText={errors.end}
          size="small"
        />

        <Button onClick={handleGenerate} text="Generate" />
      </Box>

      {/* Inventory List */}
      {inventory.length > 0 && (
        <div className="table-container max-h-[50vh]">
          <table>
            <thead>
              <tr>
                <th>Serial No</th>
                <th>File</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {inventory.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>

                  <td>
                    <IconButton size="small" component="label">
                      <Icon icon="ep:upload-filled" width={20} />
                      <input
                        type="file"
                        accept="application/pdf"
                        hidden
                        onChange={(e) => handlePdfUpload(e, row.id)}
                      />
                    </IconButton>{' '}
                  </td>

                  <td>
                    <IconButton size="small">
                      <Icon icon="" />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default InventoryForm;
