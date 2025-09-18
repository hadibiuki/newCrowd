import axios from 'axios';
import Dropzone from 'ui/dropzone/Dropzone.vue';
import { ref } from 'vue';

const percent = ref(0);
const uploadedFile = ref();
const uploadError = ref();

function cancelUpload() {
  console.log('canceled upload');
}

function deleteUploadedFile(value) {
  console.log(value);
  console.log('delete');
}

async function uploadFile(value: any) {
  uploadError.value = false;
  try {
    const formData = new FormData();
    formData.append('file', value[0]);
    const response = await axios.post('https://api.escuelajs.co/api/v1/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: progressEvent => {
        const progress = Math.round((progressEvent.loaded * 100) / Number(progressEvent.total));
        percent.value = progress;
        console.log(`Upload Progress: ${progress}%`);
      },
    });
    uploadedFile.value = response.data;
    percent.value = 0;
  } catch (error) {
    uploadError.value = true;
  }
}

async function uploadFileRetry(value: any) {
  uploadError.value = false;
  try {
    const formData = new FormData();
    formData.append('file', value[0]);
    const response = await axios.post('https://api.escuelajs.co/api/v1/files/uploa', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: progressEvent => {
        const progress = Math.round((progressEvent.loaded * 100) / Number(progressEvent.total));
        percent.value = progress;
        console.log(`Upload Progress: ${progress}%`);
      },
    });
    uploadedFile.value = response.data;
    percent.value = 0;
  } catch (error) {
    uploadError.value = true;
  }
}

export default {
  argTypes: {},
  component: Dropzone,
  tags: ['autodocs'],
  title: 'components/Dropzone',
};

const TemplateDefault = () => ({
  components: { Dropzone },
  setup() {
    return { cancelUpload, percent, uploadFile, uploadedFile };
  },
  template: `
    <div>
      <Dropzone @onUpload="uploadFile" :uploadedFile="uploadedFile" :percent="percent"/>
    </div>
  `,
});
const TemplateCancel = () => ({
  components: { Dropzone },
  setup() {
    return { cancelUpload, percent, uploadFile, uploadedFile };
  },
  template: `
    <div>
      <Dropzone :uploadedFile="uploadedFile" @onCancel="cancelUpload"/>
    </div>
  `,
});
const TemplateDelete = () => ({
  components: { Dropzone },
  setup() {
    return { deleteUploadedFile, percent, uploadFile, uploadedFile };
  },
  template: `
    <div>
      <Dropzone :percent="percent" @onUpload="uploadFile" :uploadedFile="uploadedFile" @onDelete="deleteUploadedFile"/>
    </div>
  `,
});
const TemplateRetry = () => ({
  components: { Dropzone },
  setup() {
    return { deleteUploadedFile, percent, uploadError, uploadFileRetry, uploadedFile };
  },
  template: `
    <div>
      <Dropzone :percent="percent" @onUpload="uploadFileRetry" :uploadedFile="uploadedFile" @onDelete="deleteUploadedFile" :uploadError="uploadError" :description="false"/>
    </div>
  `,
});
const TemplateLimitUpload = () => ({
  components: { Dropzone },
  setup() {
    return { percent, uploadFile, uploadedFile };
  },
  template: `
    <div>
      <Dropzone @onUpload="uploadFile" :uploadedFile="uploadedFile" :percent="percent" :maxFiles="3"/>
    </div>
  `,
});

export const Default = {
  args: {},
};

export const WithAccept = {
  args: {
    accept: ['image/*', '.doc', '.pdf'],
  },
};

export const WithDnd = {
  args: {
    dnd: true,
  },
};

export const WithDndDisabled = {
  args: {
    disabled: true,
    dnd: true,
  },
};

export const WithDndLoading = {
  args: {
    dnd: true,
    loading: true,
  },
};

export const Disabled = {
  args: {
    disabled: true,
  },
};

export const WithMaxSize = {
  args: {
    maxSize: 5e4,
  },
};

export const WithMaxFiles = {
  args: {
    maxFiles: 3,
  },
};

export const WithMinSize = {
  args: {
    minSize: 5e5,
  },
};

export const WithFetch = TemplateDefault.bind({});
export const WithCancelUpload = TemplateCancel.bind({});
export const WithDeletelFiles = TemplateDelete.bind({});
export const WithRetry = TemplateRetry.bind({});
export const WithLimitUpload = TemplateLimitUpload.bind({});
