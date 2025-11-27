import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { projectSchema } from '../../utils/validationSchemas';

export default function ProjectForm({ onSubmit, initialData = {}, buttonText = 'Create Project' }) {
  // 表单配置
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(projectSchema),
    defaultValues: initialData, // 编辑时填充初始数据
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card">
      <div>
        <label className="form-label" htmlFor="title">Project Title</label>
        <input
          type="text"
          id="title"
          className="form-input"
          {...register('title')}
        />
        {errors.title && <p className="error">{errors.title.message}</p>}
      </div>

      <div>
        <label className="form-label" htmlFor="description">Description</label>
        <textarea
          id="description"
          className="form-input h-32"
          {...register('description')}
        ></textarea>
        {errors.description && <p className="error">{errors.description.message}</p>}
      </div>

      <div>
        <label className="form-label" htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          className="form-input"
          {...register('imageUrl')}
        />
        {errors.imageUrl && <p className="error">{errors.imageUrl.message}</p>}
      </div>

      <div>
        <label className="form-label" htmlFor="link">Project Link</label>
        <input
          type="text"
          id="link"
          className="form-input"
          {...register('link')}
        />
        {errors.link && <p className="error">{errors.link.message}</p>}
      </div>

      <button type="submit" className="btn w-full mt-2">
        {buttonText}
      </button>
    </form>
  );
}