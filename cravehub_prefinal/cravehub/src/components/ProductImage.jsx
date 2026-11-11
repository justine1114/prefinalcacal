import { useEffect, useState } from 'react'
import { loadUploadedImage } from '../utils/storage'

export default function ProductImage({ product, className = '', loading = 'lazy', alt = product.name }) {
  const [uploadedSource, setUploadedSource] = useState(null)
  const [loadFailure, setLoadFailure] = useState(null)
  const imageClassName = ['product-image', className].filter(Boolean).join(' ')
  const sourceKey = product.imageSourceType === 'upload'
    ? `upload:${product.imageKey}`
    : `${product.imageSourceType}:${product.imageSrc}`

  useEffect(() => {
    let active = true
    let objectUrl = ''

    if (product.imageSourceType !== 'upload' || !product.imageKey) return undefined

    loadUploadedImage(product.imageKey)
      .then((file) => {
        if (!active) return
        if (!file) {
          setLoadFailure({ sourceKey, message: 'The saved image is unavailable.' })
          return
        }

        objectUrl = URL.createObjectURL(file)
        setUploadedSource({ sourceKey, url: objectUrl })
      })
      .catch((error) => {
        if (active) {
          setLoadFailure({
            sourceKey,
            message: `Image could not be loaded: ${error.message}`,
          })
        }
      })

    return () => {
      active = false
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [product.imageKey, product.imageSourceType, product.imageSrc, sourceKey])

  const source = product.imageSourceType === 'upload'
    ? uploadedSource?.sourceKey === sourceKey ? uploadedSource.url : ''
    : product.imageSrc ?? ''
  const imageError = loadFailure?.sourceKey === sourceKey ? loadFailure.message : ''
  if (!source || imageError) {
    return (
      <div
        className={`product-image-fallback ${imageClassName}`}
        role={alt ? 'img' : undefined}
        aria-label={alt ? `${alt} image unavailable` : undefined}
        aria-hidden={alt ? undefined : true}
      >
        <span aria-hidden="true">◇</span>
        <span>{imageError || 'Image preview'}</span>
      </div>
    )
  }

  return (
    <img
      className={imageClassName}
      src={source}
      alt={alt}
      loading={loading}
      onError={() => setLoadFailure({ sourceKey, message: 'The image could not be displayed.' })}
    />
  )
}
