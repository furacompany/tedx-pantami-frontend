import apiClient from './client';

export async function uploadImage(file: File): Promise<{ success: boolean; message: string; data: { url: string } }> {
  const formData = new FormData();
  formData.append('image', file);
  const { data } = await apiClient.post('/api/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}

// fileId is usually the ImageKit file identifier; when only URL is available, the UI
// should extract the identifier part if backend expects it. If backend accepts full URL, pass it.
export async function deleteImage(fileIdOrUrl: string): Promise<{ success: boolean; message: string }> {
  const { data } = await apiClient.delete(`/api/images/delete/${encodeURIComponent(fileIdOrUrl)}`);
  return data;
}


