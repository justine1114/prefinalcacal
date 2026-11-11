import { useEffect, useRef, useState } from 'react'
import ProductImage from './ProductImage'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png']
const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png']

function checkImageUrl(value) {
  let url
  try {
    url = new URL(value)
  } catch {
    return Promise.reject(new Error('Enter a valid image URL.'))
  }

  if (!['http:', 'https:'].includes(url.protocol)) {
    return Promise.reject(new Error('Image URLs must use HTTP or HTTPS.'))
  }

  return new Promise((resolve, reject) => {
    const image = new Image()
    const timeout = window.setTimeout(() => {
      image.src = ''
      reject(new Error('The image took too long to load. Check the URL and try again.'))
    }, 12000)

    image.onload = () => {
      window.clearTimeout(timeout)
      resolve(value)
    }
    image.onerror = () => {
      window.clearTimeout(timeout)
      reject(new Error('The image could not be loaded from that URL.'))
    }
    image.src = value
  })
}

function checkImageFile(file) {
  const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
  if (
    (file.type && !ACCEPTED_TYPES.includes(file.type)) ||
    !ACCEPTED_EXTENSIONS.includes(extension)
  ) {
    return Promise.reject(new Error('Choose a JPG, JPEG, or PNG image.'))
  }

  return new Promise((resolve, reject) => {
    const previewUrl = URL.createObjectURL(file)
    const image = new Image()

    image.onload = () => resolve({ file, previewUrl })
    image.onerror = () => {
      URL.revokeObjectURL(previewUrl)
      reject(new Error('This file is not a readable image.'))
    }
    image.src = previewUrl
  })
}

export default function ImageField({ initialProduct, onChange, error, altText }) {
  const fileInput = useRef(null)
  const previewRef = useRef('')
  const [method, setMethod] = useState(
    initialProduct?.imageSourceType === 'url' ? 'url' : 'upload',
  )
  const [url, setUrl] = useState(
    initialProduct?.imageSourceType === 'url' ? initialProduct.imageSrc ?? '' : '',
  )
  const [previewUrl, setPreviewUrl] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [savedImageAvailable, setSavedImageAvailable] = useState(
    Boolean(initialProduct?.imageSrc || initialProduct?.imageKey),
  )
  const [urlPreview, setUrlPreview] = useState(
    initialProduct?.imageSourceType === 'url' ? initialProduct.imageSrc ?? '' : '',
  )
  const [statusMessage, setStatusMessage] = useState('')
  const [imageError, setImageError] = useState('')
  const [dragging, setDragging] = useState(false)

  useEffect(
    () => () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current)
    },
    [],
  )

  function chooseMethod(nextMethod) {
    if (method === nextMethod) return
    if (previewRef.current) URL.revokeObjectURL(previewRef.current)
    previewRef.current = ''
    setMethod(nextMethod)
    setSelectedFile(null)
    setPreviewUrl('')
    setUrl('')
    setUrlPreview('')
    setSavedImageAvailable(false)
    setImageError('')
    setStatusMessage('')
    onChange({ sourceType: nextMethod, imageSrc: '', imageKey: '', file: null })
  }

  async function handleFile(file) {
    setImageError('')
    setStatusMessage('')
    setSavedImageAvailable(false)
    if (previewRef.current) URL.revokeObjectURL(previewRef.current)

    try {
      const validated = await checkImageFile(file)
      previewRef.current = validated.previewUrl
      setSelectedFile(validated.file)
      setPreviewUrl(validated.previewUrl)
      onChange({
        sourceType: 'upload',
        imageSrc: '',
        imageKey: '',
        file: validated.file,
      })
    } catch (validationError) {
      previewRef.current = ''
      setSelectedFile(null)
      setPreviewUrl('')
      onChange({ sourceType: 'upload', imageSrc: '', imageKey: '', file: null })
      setImageError(validationError.message)
    }
  }

  async function previewImageUrl() {
    setImageError('')
    setStatusMessage('')
    setUrlPreview('')
    setSavedImageAvailable(false)
    try {
      const validUrl = await checkImageUrl(url.trim())
      setUrlPreview(validUrl)
      onChange({
        sourceType: 'url',
        imageSrc: validUrl,
        imageKey: '',
        file: null,
      })
      setStatusMessage('Image preview is ready.')
    } catch (validationError) {
      onChange({ sourceType: 'url', imageSrc: '', imageKey: '', file: null })
      setImageError(validationError.message)
    }
  }

  function removeImage() {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current)
    previewRef.current = ''
    setSelectedFile(null)
    setSavedImageAvailable(false)
    setPreviewUrl('')
    setUrlPreview('')
    setUrl('')
    setImageError('')
    setStatusMessage('Image removed.')
    onChange({ sourceType: method, imageSrc: '', imageKey: '', file: null })
    if (fileInput.current) fileInput.current.value = ''
  }

  const hasPreview = Boolean(previewUrl || urlPreview || (savedImageAvailable && !selectedFile))
  const currentProduct = initialProduct
    ? {
        ...initialProduct,
        imageSrc:
          initialProduct.imageSourceType === 'url'
            ? urlPreview
            : initialProduct.imageSrc,
      }
    : null

  return (
    <fieldset
      className="image-field"
      id="product-image"
      tabIndex="-1"
      aria-describedby={error || imageError ? 'feature-image-error' : undefined}
    >
      <legend>Feature Image <span className="required-mark">Required</span></legend>
      <div className="segmented-control" role="group" aria-label="Choose image source">
        <button
          className={method === 'upload' ? 'is-selected' : ''}
          type="button"
          aria-pressed={method === 'upload'}
          onClick={() => chooseMethod('upload')}
        >
          Upload Image
        </button>
        <button
          className={method === 'url' ? 'is-selected' : ''}
          type="button"
          aria-pressed={method === 'url'}
          onClick={() => chooseMethod('url')}
        >
          Image URL
        </button>
      </div>

      {method === 'upload' ? (
        <div className="upload-controls">
          <div
            className={`upload-dropzone ${dragging ? 'is-dragging' : ''}`}
            onDragOver={(event) => {
              event.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault()
              setDragging(false)
              const file = event.dataTransfer.files[0]
              if (file) handleFile(file)
            }}
          >
            <p id="feature-image-instructions">Drop a JPG, JPEG, or PNG image here.</p>
            <label className="button button-outline button-small" htmlFor="feature-image-file">
              Browse files
            </label>
            <input
              ref={fileInput}
              id="feature-image-file"
              type="file"
              accept=".jpg,.jpeg,.png,image/jpeg,image/png"
              className="visually-hidden"
              required={method === 'upload' && !hasPreview}
              aria-describedby="feature-image-instructions feature-image-error"
              aria-invalid={Boolean(error || imageError)}
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (file) handleFile(file)
              }}
            />
          </div>
          {selectedFile && (
            <p className="file-name" aria-live="polite">
              Selected: {selectedFile.name}
            </p>
          )}
        </div>
      ) : (
        <div className="url-controls">
          <label htmlFor="feature-image-url">Paste Image URL</label>
          <div className="url-input-row">
            <input
              id="feature-image-url"
              type="url"
              value={url}
              placeholder="https://example.com/product-image.jpg"
              required={method === 'url' && !hasPreview}
              aria-describedby="feature-image-url-instructions feature-image-error"
              onChange={(event) => {
                setUrl(event.target.value)
                setUrlPreview('')
                setSavedImageAvailable(false)
                setImageError('')
                setStatusMessage('')
                onChange({ sourceType: 'url', imageSrc: '', imageKey: '', file: null })
              }}
              aria-invalid={Boolean(error || imageError)}
            />
            <button className="button button-primary button-small" type="button" onClick={previewImageUrl}>
              Preview Image
            </button>
          </div>
          <p className="form-hint" id="feature-image-url-instructions">
            Enter an HTTP or HTTPS image URL and preview it before saving.
          </p>
        </div>
      )}

      <div className="image-preview" aria-label="Feature image preview">
        {previewUrl ? (
          <img className="product-image" src={previewUrl} alt={altText || 'Product image preview'} />
        ) : urlPreview ? (
          <img className="product-image" src={urlPreview} alt={altText || 'Product image preview'} />
        ) : savedImageAvailable && currentProduct ? (
          <ProductImage product={currentProduct} className="image-preview-saved" loading="eager" />
        ) : (
          <p>Preview will appear here.</p>
        )}
        {hasPreview && (
          <button className="text-button image-remove" type="button" onClick={removeImage}>
            Remove image
          </button>
        )}
      </div>
      <p className="form-hint">Use a clear image with JPG, JPEG, or PNG format.</p>
      <p
        className={error || imageError ? 'field-error' : 'field-success'}
        id="feature-image-error"
        role="status"
        aria-live="polite"
      >
        {error || imageError || statusMessage}
      </p>
    </fieldset>
  )
}
