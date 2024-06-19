FROM python
WORKDIR /backend
ENV PYTHONDONTWRITEBYTECODE = 1\
	PYTHONNONBUFFERED = 1
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . /backend
