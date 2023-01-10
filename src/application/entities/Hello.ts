export interface HelloProps {
  message: string;
}

export class Hello {
  private props: HelloProps
  constructor(props: HelloProps) {
    this.props = props
   }

  public get message() {
    return this.props.message;
  }
  
}