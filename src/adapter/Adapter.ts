export interface Adapter<T> {
  read(): Promise<T | undefined>
  write(data: T): Promise<void>
}
