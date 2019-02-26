package com.leverx.leverxspringdemo.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.leverx.leverxspringdemo.dao.intfce.IServicesDao;
import com.leverx.leverxspringdemo.domain.Services;

@Repository
public class ServicesDao implements IServicesDao {
	
	private static final String SERVICES_TABLE = "\"HiMTA::ExtraInfo.Services\"";

	private static final Logger logger = LoggerFactory.getLogger(ServicesDao.class);

	@Autowired
	private DataSource dataSource;

	@Override
	public Optional<Services> getById(String id) {
		Optional<Services> entity = null;
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"SELECT TOP 1 \"servid\", \"microid\", \"address\" FROM "+ SERVICES_TABLE +" WHERE \"servid\" = ?")) {
			stmnt.setString(1, id);
			ResultSet result = stmnt.executeQuery();
			if (result.next()) {
				Services services = new Services();
				services.setServid(id);
				services.setMicroid(result.getString("microid"));
				services.setAddress(result.getString("address"));
				entity = Optional.of(services);
			} else {
				entity = Optional.empty();
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get entity by Id: " + e.getMessage());
		}
		return entity;
	}

	@Override
	public List<Services> getAll() {
		List<Services> servicesList = new ArrayList<Services>();
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn
						.prepareStatement("SELECT \"servid\", \"microid\", \"address\" FROM "+ SERVICES_TABLE +"")) {
			ResultSet result = stmnt.executeQuery();
			while (result.next()) {
				Services services = new Services();
				services.setServid(result.getString("servid"));
				services.setMicroid(result.getString("microid"));
				services.setAddress(result.getString("address"));
				servicesList.add(services);
			}
		} catch (SQLException e) {
			logger.error("Error while trying to get list of entities: " + e.getMessage());
		}
		return servicesList;
	}

	@Override
	public void save(Services entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"INSERT INTO "+ SERVICES_TABLE +"(\"servid\", \"microid\", \"address\") VALUES (?, ?, ?)")) {
			stmnt.setString(1, entity.getServid());
			stmnt.setString(2, entity.getMicroid());
			stmnt.setString(3, entity.getAddress());
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to add entity: " + e.getMessage());
		}
	}

	@Override
	public void delete(String id) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement("DELETE FROM "+ SERVICES_TABLE +" WHERE \"servid\" = ?")) {
			stmnt.setString(1, id);
			stmnt.execute();
		} catch (SQLException e) {
			logger.error("Error while trying to delete entity: " + e.getMessage());
		}
	}

	@Override
	public void update(Services entity) {
		try (Connection conn = dataSource.getConnection();
				PreparedStatement stmnt = conn.prepareStatement(
						"UPDATE "+ SERVICES_TABLE +" SET \"name\" = ?, \"surname\" = ?, \"age\" = ? WHERE \"servid\" = ?")) {
			stmnt.setString(1, entity.getServid());
			stmnt.setString(2, entity.getMicroid());
			stmnt.setString(3, entity.getAddress());
			stmnt.executeUpdate();
		} catch (SQLException e) {
			logger.error("Error while trying to update entity: " + e.getMessage());
		}
	}

}
