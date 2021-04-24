---
title: JupyterLab Architecture
---

# JupyterLab Architecture

- https://jupyterlab.readthedocs.io/en/latest/extension/documents.html
- https://jupyterlab.readthedocs.io/en/latest/api

- A `Document` refers to any visual, or non-visual, information that is backed by the `ContentsApi`.

- The `FileBrowser` uses the `DocumentManager` to open and manage the `Document`.
- The `DocumentManager` uses the `DocumentRegistry` to create `DocumentModel`, `DocumentContext` and `DocumentsWidget`.
- The `DocumentManager` manages the lifecycle of `DocumentModel`, `DocumentContext` and `Document`.
- The `DocumentWidgetManager` maintains the lifecycle of contents-backed `DocumentWidget`.

- JupyterLab can be extended in several ways:
  - `ApplicationExtension`
  - `RenderMimeExtension`
  - `ThemeExtension`
  - `WidgetExtension` which extends the functionality of a `DocumentWidget`

- An `Extension` can require a `DocumentRegistry` instance and register:
  - `FileType`
  - `ModelFactory` for a `FileType`
  - `WidgetFactory` for a `ModelFactory`
  - `WidgetExtension` for a `DocumentWidget` and `DocumentModel`

- A `Document` is represented by a `DocumentModel` instance implementing the `IModel` interface.
- The `IModel` interface is intentionally fairly small and concentrates on representing the data in the `Document` and signaling changes to that data.

- The `IModel` typically contains an observable modelDB implementation of `IModelDB` to persists the data.
- The `IModel` maintains a map of `Collaborator`.
- The `IModelDB.IFactory` creates a `IModelDB` implementation.
- A default implementation of `IModelDB` is `ModelDB`.
- Use `view(basePath)` to create a view onto a subtree of the `IModelDB` database.

- A `ModelFactory` creates a `DocumentModel` for a given `FileType`.
- A `ModelFactory` is generally differentiated by the content options used to create the `DocumentModel`.

- A `DocumentModel` is created by the `ModelFactory` and passed to `WidgetFactory` and `WidgetExtension`.
- `A DocumentModel` is the way in which extensions interact with the data of a `Document`.
  - For a simple text file, extensions typically only use the toString and fromString methods.
  - A more complex `Document` like a notebook contains more points of interaction like the notebook metadata.

- Each `DocumentModel` has an associated `DocumentContext` instance as well.
- The `DocumentContext` for a `DocumentModel` is the bridge between the internal data of the document, stored in the `DocumentModel`, as the metadata and operations on the file such as `save`, `revert`...
- The `DocumentContext` is created by the `DocumentManager` and passed to `WidgetFactory` and `WidgetExtension`.
- The `DocumentContext` contains the `DocumentModel` as one of its properties so that we can pass a single object around.
- The `DocumentContext` is used to provide an abstracted interface to the `Session` and `ContentsAPI` from `@jupyterlab/services` for the given `DocumentModel`.
- A `DocumentContext` can be shared between multiple `DocumentWidget`.
- The reason for a separate `DocumentContext` and `DocumentModel` is so that it is easy to create model factories and the heavy lifting of the context is left to the `DocumentManager`
- The `DocumentContext` is not meant to be subclassed or re-implemented, instead, the `DocumentContext` is intended to be the glue between the `DocumentModel` and the wider application.

- A single `Content/File` path can have multiple different `DocumentModel`, and hence multiple different `DocumentContext`, representing the `Content/File`.
- For example, a Notebook can be opened with a `NotebookModel` and with a `TextModel`.
- Different `DocumentModel` for the same `Content/File` path do not directly communicate with each other.
- Since many objects will need both the `DocumentContext` and the `DocumentModel`, the `DocumentContext` contains a reference to the `DocumentModel` as its .model attribute.

- A `DocumentWidget`extends a `LuminoWidget`and a `DocumentModel`.

- the `WidgetFactory` creates a `DocumentWidget` for a given `FileType` that represents a view of a `DocumentModel`.
- For example, the `NotebookWidgetFactory` factory creates `NotebookPanelWidgets`.
- There can be multiple `DocumentWidget` associated with a single `DocumentModel`, and they naturally stay in sync with each other since they are views on the same underlying `DocumentModel`.
- The `ABCWidgetFactory` extends `IDocumentWidget` and `DocumentRegistry.IModel` and implements `DocumentRegistry.IWidgetFactory`.

- A `WidgetExtension` extends the behaviour of a `WidgetFactory` to add additional functionality to a `DocumentWidget`.
- A `WidgetExtension` instance is created for each `DocumentWidget` instance, enabling the extension to add functionality to each `DocumentWidget` or observe the `DocumentWidget` and/or its `DocumentContext`.
- For example, you can a Button to the Toolbar of each NotebookPanel `DocumentWidget`.

```bash
# FileTypes

# app.docRegistry.addFileType({
#   name: 'example',
#   icon: runIcon,
#   displayName: 'Example File',
#   extensions: ['.example'],
#   fileFormat: 'text',
#   contentType: 'file',
#   mimeTypes: ['text/plain']
# });

0: {name: "file", displayName: "Text", extensions: Array(1), mimeTypes: Array(1), contentType: "file", …}
1: {name: "notebook", displayName: "Notebook", extensions: Array(1), mimeTypes: Array(1), contentType: "notebook", …}
2: {name: "directory", displayName: "Directory", extensions: Array(0), mimeTypes: Array(1), contentType: "directory", …}
3: {name: "markdown", displayName: "Markdown File", extensions: Array(1), mimeTypes: Array(1), contentType: "file", …}
4: {name: "PDF", displayName: "PDF File", extensions: Array(1), mimeTypes: Array(1), contentType: "file", …}
5: {name: "python", displayName: "Python File", extensions: Array(1), mimeTypes: Array(1), contentType: "file", …}
6: {name: "json", displayName: "JSON File", extensions: Array(1), mimeTypes: Array(1), contentType: "file", …}
7: {name: "csv", displayName: "CSV File", extensions: Array(1), mimeTypes: Array(1), contentType: "file", …}
8: {name: "tsv", displayName: "TSV File", extensions: Array(1), mimeTypes: Array(1), contentType: "file", …}
9: {name: "r", displayName: "R File", extensions: Array(1), mimeTypes: Array(1), contentType: "file", …}
10: {name: "yaml", displayName: "YAML File", extensions: Array(2), mimeTypes: Array(2), contentType: "file", …}
11: {name: "svg", displayName: "Image", extensions: Array(1), mimeTypes: Array(1), contentType: "file", …}
12: {name: "tiff", displayName: "Image", extensions: Array(2), mimeTypes: Array(1), contentType: "file", …}
13: {name: "jpeg", displayName: "Image", extensions: Array(2), mimeTypes: Array(1), contentType: "file", …}
14: {name: "gif", displayName: "Image", extensions: Array(1), mimeTypes: Array(1), contentType: "file", …}
15: {name: "png", displayName: "Image", extensions: Array(1), mimeTypes: Array(1), contentType: "file", …}
16: {name: "bmp", displayName: "Image", extensions: Array(1), mimeTypes: Array(1), contentType: "file", …}
17: {name: "html", displayName: "HTML File", extensions: Array(1), mimeTypes: Array(1), contentType: "file", …}
18: {name: "vega5", displayName: "default", extensions: Array(3), mimeTypes: Array(1), contentType: "file", …}
19: {name: "vega-lite4", displayName: "default", extensions: Array(3), mimeTypes: Array(1), contentType: "file", …}
20: {name: "vega-lite3", displayName: "default", extensions: Array(0), mimeTypes: Array(1), contentType: "file", …}
21: {name: "jupyterlab-workspace", displayName: "JupyterLab workspace File", extensions: Array(1), mimeTypes: Array(1), contentType: "file", …}

0: {name: "file", displayName: "Text", extensions: Array(1), mimeTypes: Array(1), contentType: "file", …}
  contentType: "file"
  displayName: "Text"
  extensions: [".txt"]
  fileFormat: "text"
  icon: LabIcon {_props: {…}, _svgReplaced: Signal, _svgElement: undefined, _svgInnerHTML: undefined, _svgReactAttrs: undefined, …}
  mimeTypes: ["text/plain"]
  name: "text"

getFileTypeForModel(
    model: Partial<Contents.IModel>
  ): DocumentRegistry.IFileType 
```

```bash
export interface IModel extends IDisposable {
  contentChanged: ISignal<this, void>;
  stateChanged: ISignal<this, IChangedArgsGeneric<any>>;
  dirty: boolean;
  readOnly: boolean;
  readonly defaultKernelName: string;
  readonly defaultKernelLanguage: string;
  readonly modelDB: IModelDB;
  toString(): string;
  fromString(value: string): void;
  toJSON(): PartialJSONValue;
  fromJSON(value: ReadonlyPartialJSONValue): void;
  initialize(): void;

export interface IModelFactory<T extends IModel> extends IDisposable {
  readonly name: string;
  readonly contentType: Contents.ContentType;
  readonly fileFormat: Contents.FileFormat;
  createNew(languagePreference?: string, modelDB?: IModelDB): T;
  preferredLanguage(path: string): string;
```

```bash
# ModelFactories

# DocumentRegistry.IModelFactory<T extends IModel> extends IDisposable
# INotebookModel extends DocumentRegistry.IModel

# NotebookModelFactory implements DocumentRegistry.IModelFactory<INotebookModel>

# ICodeModel extends IModel, CodeEditor.IModel {}
# CodeModelFactory = IModelFactory<ICodeModel>;

# TextModelFactory implements DocumentRegistry.CodeModelFactory

# DocumentRegistry.addModelFactory(factory: DocumentRegistry.ModelFactory): IDisposable

0: "text"
1: "base64"
2: "notebook"

0: "text"
  contentType: "file"
  fileFormat: "text"
  isDisposed: false
  name: "text"

# ICodeModel extends IModel, CodeEditor.IModel
# CodeModelFactory = IModelFactory<ICodeModel>;
# Base64ModelFactory extends TextModelFactory implements DocumentRegistry.CodeModelFactory 
  _isDisposed: false
  contentType: "file"
  fileFormat: "base64"
  isDisposed: false
  name: "base64"

# NotebookModelFactory implements DocumentRegistry.IModelFactory<INotebookModel>
  {_disposed: false, contentFactory: ContentFactory}
  contentFactory: ContentFactory {codeCellContentFactory: ContentFactory, modelDB: undefined}
  _disposed: false
  contentType: "notebook"
  fileFormat: "json"
  isDisposed: false
  name: "notebook"
```

```bash
# WidgetFactories

export interface IDocumentWidget<T extends Widget = Widget, U extends DocumentRegistry.IModel = DocumentRegistry.IModel> extends Widget {
  readonly content: T;
  readonly revealed: Promise<void>;
  readonly context: DocumentRegistry.IContext<U>;
  readonly toolbar: Toolbar<Widget>;
  setFragment(fragment: string): void;

# WidgetFactory = IWidgetFactory<IDocumentWidget, IModel>;
# IWidgetFactory<T extends IDocumentWidget, U extends IModel> extends IDisposable, IWidgetFactoryOptions
#   createNew(context: IContext<U>, source?: T): T;
#   widgetCreated: ISignal<IWidgetFactory<T, U>, T>;
# ABCWidgetFactory<T extends IDocumentWidget, U extends DocumentRegistry.IModel = DocumentRegistry.IModel> implements DocumentRegistry.IWidgetFactory<T, U>
#   NotebookWidgetFactory extends ABCWidgetFactory<NotebookPanel, INotebookModel>
#   FileEditorFactory extends ABCWidgetFactory<IDocumentWidget<FileEditor>, DocumentRegistry.ICodeModel>
#   ImageViewerFactory extends ABCWidgetFactory<IDocumentWidget<ImageViewer>>

# DocumentWidget<T extends Widget = Widget, U extends DocumentRegistry.IModel = DocumentRegistry.IModel> extends MainAreaWidget<T> implements IDocumentWidget<T, U>
# Preview extends DocumentWidget<IFrame, INotebookModel>
# PreviewFactory extends ABCWidgetFactory<Preview, INotebookModel>
# const factory = new PreviewFactory(getPreviewUrl, {
#   name: "preview",
#   fileTypes: ["notebook"],
#   modelName: "notebook"
# });
# app.docRegistry.addWidgetFactory(factory);
# commands.execute("docmanager:open", {
#   path: context.path,
#   factory: "preview",
#   options: {
#     mode: "split-right"
#   }
# });

0: "html viewer"
1: "image"
2: "image (text)"
3: "csvtable"
4: "tsvtable"
5: "json"
6: "pdf"
7: "vega5"
8: "vega-lite4"
9: "notebook"
10: "markdown preview"
11: "workspace loader"
```

```bash
# WidgetExtensions

# DocumentRegistry.WidgetExtension<T extends Widget, U extends IModel>
#   createNew(widget: T, context: IContext<U>): IDisposable;

# ExecuteTimeWidgetExtension implements DocumentRegistry.WidgetExtension
# app.docRegistry.addWidgetExtension('notebook', new ExecuteTimeWidgetExtension(settingRegistry));

# RunAllCellsButtonExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel>
# app.docRegistry.addWidgetExtension('notebook', new RunAllCellsButtonExtension(app));

# widget-extensions(notebook)
0: RunAllCellsButtonExtension {app: JupyterLab}
1: _ {_docmanager: DocumentManager}
2: ExecuteTimeWidgetExtension {_settingRegistry: SettingRegistry}
3: PreviewRenderButton {_commands: CommandRegistry}
```

```bash
export interface RenderMime.IDocumentWidgetFactoryOptions {
  readonly name: string;
  readonly modelName?: string;
  readonly primaryFileType: string;
  readonly fileTypes: ReadonlyArray<string>;
  readonly defaultFor?: ReadonlyArray<string>;
  readonly defaultRendered?: ReadonlyArray<string>;
  readonly toolbarFactory?: (widget?: IRenderer) => IToolbarItem[];
```
